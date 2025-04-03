# Pregunta 3

Trabajas en una FINTECH, esta cuenta con una aplicación de pagos digitales que permite a los usuarios enviar y recibir dinero en tiempo real.
Un usuario puede ver su historial de transacciones en la sección "Mis Movimientos". Sin embargo, hemos recibido quejas de que la pantalla tarda demasiado en cargar, y a veces, muestra datos desactualizados o transacciones duplicadas.

Tu tarea es identificar y corregir el problema en el código.

`transactionsComponent.component.ts`
```typescript
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions = [];
  isLoading = false;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.isLoading = true;
    
    this.transactionsService.getTransactions().subscribe(data => {
      this.transactions = data;
      this.isLoading = false;
    });

    setInterval(() => {
      this.transactionsService.getTransactions().subscribe(data => {
        this.transactions = data;
      });
    }, 10000);
  }
}
```

## Respuesta:

Este es un error muy común en aplicaciones que utilizan servicios para obtener datos. El problema radica en que el componente `TransactionsComponent` está utilizando un `setInterval` para actualizar las transacciones cada 10 segundos, sin limpiar las suscripciones anteriores. Esto puede causar que se acumulen múltiples suscripciones y, por lo tanto, múltiples actualizaciones de la lista de transacciones, lo que puede llevar a datos desactualizados o duplicados, también puede causar problemas de rendimiento por el uso excesivo de memoria y recursos.

Una solución sería utilizar una librería muy popular, con más de 50 millones de descargas por semana, pesa relativamente poco y esta en constante mantenimiento, esta librería de javascript se llama `rxjs`.

`Rxjs` permite manejar la suscripción y cancelación de forma más eficiente. En este caso, se puede utilizar el operador `takeUntil` y `Subject` para cancelar la suscripción y limpiar `setInterval` cuando el componente se destruye, respectivamente. También `Set` o `Map` para evitar duplicados. 

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { Subject, interval, switchMap, takeUntil } from 'rxjs';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions: any[] = [];
  isLoading = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.loadTransactions();
    this.startAutoRefresh();
  }

  loadTransactions() {
    this.isLoading = true;
    this.transactionsService.getTransactions().subscribe(data => {
      this.transactions = this.removeDuplicates(data);
      this.isLoading = false;
    });
  }

  startAutoRefresh() {
    interval(10000) // Ejecutar cada 10 segundos
      .pipe(
        switchMap(() => this.transactionsService.getTransactions()), // Asegurar que solo se mantenga la última suscripción activa
        takeUntil(this.unsubscribe$) // Evitar fugas de memoria y cancelar la suscripción
      )
      .subscribe(data => {
        this.transactions = this.removeDuplicates(data);
      });
  }

  removeDuplicates(transactions: any[]): any[] {
    const uniqueTransactions = new Map();
    transactions.forEach(tx => uniqueTransactions.set(tx.id, tx)); // Se debe utilizar un id único para cada transacción
    return Array.from(uniqueTransactions.values());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
```
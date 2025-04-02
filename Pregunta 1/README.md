# Pregunta 1
Una aplicación FINTECH detecta si un usuario ha realizado transacciones duplicadas en un mismo día si:

-	Tiene exactamente el mismo monto que otra transacción ya registrada ese día.
-	Fue realizada en menos de 5 minutos de diferencia con la anterior.

Se requiere escribir un algoritmo (en seudocódigo) eficiente que, dado un conjunto de transacciones (con monto y minuto del día en que ocurrió), detecte cuántas transacciones son duplicadas.

READ

`[(100, 12), (250, 30), (100, 15), (300, 45), (100, 20)]`

-	La transacción de $100 a los 12 min es original.
-	La transacción de $100 a los 15 min es duplicada.
-	La transacción de $100 a los 20 min NO es duplicada (pasaron más de 5 minutos).
-	La transacción de $250 y $300 son únicas.

Salida esperada: 1 transacción duplicada.

## Respuesta:

En el siguiente seudocódigo va a utilizar un diccionario clave-valor (Map en Javascript) para almacenar las transacciones y sus respectivos minutos. De esta manera evitamos recorrer la lista de transacciones múltiples veces de forma innecesaria (perf#1), lo que mejora la eficiencia del algoritmo al reducir la complejidad temporal a O(n log k) -> Rápido en lugar de O(n^2) -> Muy lento.

```text
transacciones = [(100, 12), (250, 30), (100, 15), (300, 45), (100, 20)]
Función contarTransaccionesDuplicadas(transacciones):
    // Declarar una variables tipo diccionario vacía y tipo numérica con valor inicial cero
    transaccionesPorMonto
    duplicadas = 0

    Para cada (monto, minuto) en transacciones:
        Si monto no está en transaccionesPorMonto:
            // Agregar monto a transaccionesPorMonto con una lista vacía
            transaccionesPorMonto[monto] = []
        Fin Si

        /* Declarar una variable tipo lista para el tiempo */
        listaDeMinutos = transaccionesPorMonto[monto]

        /* Buscar si hay transacciones duplicadas en la lista de minutos */
        Para cada minutoExistente en listaDeMinutos:
            Si minuto - minutoExistente <= 5:
                duplicadas = duplicadas + 1
                Romper // Salir del bucle si se encuentra una duplicada, para evitar contarla más de una vez (perf#1)
            Fin Si
        Fin Para

        // Agregar el minuto actual a la lista de minutos ordenadamente
        Insertar minuto en listaDeMinutos de forma ordenada

    Fin Para

    // Retornar el número de transacciones duplicadas
    Retornar duplicadas
Fin Función

// Ejemplo de uso
resultado = contarTransaccionesDuplicadas(transacciones)
Imprimir resultado // Salida esperada: 1
```

### Explicación del algoritmo eficiente:

1. Se inicializa un diccionario donde la clave es el monto y el valor es una lista de minutos.
2. En cada nueva transacción:
   1. Se verifica si había otra transacción con el mismo monto dentro de los últimos 5 minutos.
   2. Si se encuentra, se cuenta como duplicada.
   3. Para comparar en cada nueva transacción, se agrega el minuto a la lista de minutos del monto correspondiente.

Esto ayuda a optimizar el proceso de comparaciones innecesarias entre transacciones con montos diferentes.
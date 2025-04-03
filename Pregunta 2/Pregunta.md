# Pregunta 2

Una aplicación FINTECH permite a los usuarios realizar conversiones de divisas dentro de su billetera digital. Actualmente, el sistema solo permite manejar saldo en moneda local (USD, por defecto), pero los usuarios necesitan la capacidad de convertir su saldo a otras monedas.

Se debe crear un servicio REST (Puede ser desarrollado en NestJS o en Express) que:

1.	Obtenga tasas de cambio en tiempo real desde una API de divisas (se debe simular para esta pregunta, no es necesario conectarse a una API)
    1.	Debe devolver las tasas de cambio actuales en relación con USD.
    2.	Ejemplo de respuesta: `{“EUR”: 0.92, “MXN”: 17.54, “BTC”: 0.000023}`
2.	Permita a los usuarios convertir dinero de su saldo a otra moneda y almacene el saldo convertido en su billetera.
    1.	Debe recibir un monto y una moneda de destino.
    2.	Debe convertir el saldo del usuario a la moneda de destino y guardarlo en su billetera.
    3.	Si el saldo es insuficiente, devuelve un error.
    4.	Ejemplo petición: `{“monto”: 100, “monedaDestino”: “EUR”}`
3.	Permita consultar el saldo en distintas divisas.
    1.	Devuelve el saldo del usuario en todas las monedas almacenadas.

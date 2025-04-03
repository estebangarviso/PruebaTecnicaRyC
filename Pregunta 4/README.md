# Pregunta 4

Trabajas en una aplicación FINTECH que permite a los usuarios realizar pagos digitales, transferencias bancarias y gestionar sus cuentas en línea.

El sistema almacena información de:
•	Usuarios
•	Cuentas Bancarias
•	Transacciones
•	Tarjetas de Crédito/Débito

Los clientes pueden:
1.	Registrar sus cuentas bancarias en la aplicación.
2.	Realizar transferencias entre cuentas propias o a otros usuarios.
3.	Agregar y administrar tarjetas para realizar pagos en línea.


SCRIPT SQL
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bank_accounts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  account_number VARCHAR(20) UNIQUE NOT NULL,
  balance DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  from_account_id INT NOT NULL,
  to_account_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_account_id) REFERENCES bank_accounts(id),
  FOREIGN KEY (to_account_id) REFERENCES bank_accounts(id)
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  card_number VARCHAR(16) UNIQUE NOT NULL,
  expiration_date DATE NOT NULL,
  cvv VARCHAR(3) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

Se requiere obtener el historial de transacciones de un usuario, mostrando la siguiente información:
•	Nombre del usuario
•	Número de cuenta bancaria
•	Monto de la transacción
•	Estado de la transacción
•	Fecha de la transacción
•	Nombre del usuario receptor

Consulta SQL

```sql
SELECT 
    u.full_name AS sender_name,
    ba.account_number AS sender_account,
    t.amount,
    t.status,
    t.created_at,
    u2.full_name AS receiver_name
FROM transactions t
JOIN bank_accounts ba ON t.from_account_id = ba.id
JOIN users u ON ba.user_id = u.id
JOIN bank_accounts ba2 ON t.to_account_id = ba2.id
JOIN users u2 ON ba.user_id = u2.id
WHERE u.id = 1;
```

Se debe verificar que la consulta esté correctamente construida, asegurando que no contenga errores. En caso de detectar algún error, se debe identificar, explicar su causa y proponer la corrección adecuada.

# Respuesta:

La consulta SQL tiene un error relacionado con el receptor. Sucede que se esta tratando de unir la tabla `users u2` con `bank_accounts ba2` usando `ba.user_id = u2.id`, lo cual no es correcto. Debería ser `ba2.user_id = u2.id`. Esto se debe a que `ba` representa la cuenta bancaria del remitente y `ba2` representa la cuenta bancaria del receptor.

Por lo tanto, la consulta SQL corregida sería:

```sql
SELECT 
    u.full_name AS sender_name,
    ba.account_number AS sender_account,
    t.amount,
    t.status,
    t.created_at,
    u2.full_name AS receiver_name
FROM transactions t
JOIN bank_accounts ba ON t.from_account_id = ba.id
JOIN users u ON ba.user_id = u.id
JOIN bank_accounts ba2 ON t.to_account_id = ba2.id
JOIN users u2 ON ba2.user_id = u2.id -- <<< Corrección aquí
WHERE u.id = 1;
```

Esta corrección asegura que estamos uniendo correctamente la tabla de cuentas bancarias del receptor con la tabla de usuarios, permitiendo así obtener el nombre correcto del usuario receptor.


# SQL Day 3 — Modifying & Updating Data (DML)

---

## Part 1: Setup Demo Table

Before we start modifying data, we need a table to work with. Here's a standard `employees` table that matches the examples in our slides.

```sql
DROP TABLE IF EXISTS employees CASCADE;

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name  VARCHAR(50),
    last_name   VARCHAR(50),
    department  VARCHAR(50),
    salary      DECIMAL(10,2)
);

CREATE TABLE department (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);

-- Seed Data for Supporting Tables
INSERT INTO department (department_id, department_name) VALUES 
(1, 'HR'), (2, 'IT'), (3, 'Sales'), (4, 'Marketing'), (5, 'Finance'), (6, 'Legal');

-- Pokemon Demo Tables
CREATE TABLE trainers (
    trainer_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    type VARCHAR(20)
);

CREATE TABLE pokemon_types (
    p_id SERIAL PRIMARY KEY,
    pokemon VARCHAR(50),
    type VARCHAR(20)
);

CREATE TABLE gyms (
    gym_id SERIAL PRIMARY KEY,
    gym VARCHAR(50),
    type VARCHAR(20)
);

-- Seed Data for Pokemon Demo
INSERT INTO trainers (name, type) VALUES ('Ash', 'Electric'), ('Misty', 'Water'), ('Brock', 'Rock');
INSERT INTO pokemon_types (pokemon, type) VALUES ('Pikachu', 'Electric'), ('Squirtle', 'Water'), ('Onix', 'Rock');
INSERT INTO gyms (gym, type) VALUES ('Pewter Gym', 'Rock'), ('Cerulean Gym', 'Water'), ('Vermilion Gym', 'Electric');

-- Union Demo Tables
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name_patient VARCHAR(50),
    address VARCHAR(100)
);

INSERT INTO patients (first_name, last_name_patient, address) VALUES 
('Alice', 'Wonderland', '123 Rabbit Hole'),
('Bob', 'Builder', '456 Construction St');

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name_customer VARCHAR(50),
    address VARCHAR(100)
);

INSERT INTO customers (first_name, last_name_customer, address) VALUES 
('Charlie', 'Chocolate', '789 Factory Rd'),
('Alice', 'Wonderland', '123 Rabbit Hole'); -- Duplicate for UNION demo

-- Subquery Demo Tables
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10,2)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE
);

-- Seed Data for Subquery Demo
INSERT INTO products (product_name, price) VALUES ('Laptop', 1200), ('Mouse', 25), ('Keyboard', 45);
INSERT INTO orders (customer_id, order_date) VALUES (1, '2026-04-01');
```

> [!NOTE]
> `SERIAL` automatically generates unique IDs. If you provide a value manually, it will use that instead.

---

## Part 2: INSERT — Adding New Rows

The `INSERT` statement adds **new rows** into a table. You can insert into **all** columns or just a few, depending on what you've got.

### 1. Basic INSERT (with column list)

Recommended practice: explicitly list the columns you are filling.

```sql
INSERT INTO employees (employee_id, first_name, last_name, department, salary)
VALUES (101, 'John', 'Doe', 'HR', 50000);
```

### 2. Skip Column List

If you are inserting into **all columns**, you can skip the column list — just make sure the values are in the **exact order** the table expects.

```sql
INSERT INTO employees
VALUES (105, 'Linda', 'Nguyen', 'Sales', 58000);
```

### 3. Auto-Increment Handling

For auto-increment columns (like `SERIAL` or `AUTO_INCREMENT`), you can **leave them out**. The database will handle them like a responsible adult.

```sql
INSERT INTO employees (first_name, last_name, department, salary)
VALUES ('Kevin', 'Tan', 'Legal', 62000);
```

### 4. Multiple Rows At Once

To insert multiple rows in one command, separate each set of values with commas.

```sql
INSERT INTO employees (employee_id, first_name, last_name, department, salary)
VALUES
    (102, 'Jane', 'Smith', 'IT', 60000),
    (103, 'Alice', 'Johnson', 'Marketing', 55000),
    (104, 'Bob', 'Williams', 'Finance', 65000);
```

---

## Part 3: UPDATE — Changing Existing Rows

The `UPDATE` statement is used to change the values of one or more columns in existing rows.

### 1. Basic UPDATE

Common use case: updating a single row using a unique ID.

```sql
UPDATE employees
SET salary = 55000
WHERE employee_id = 101;
```

> [!CAUTION]
> **Always include a WHERE clause** unless you want to update *every single row* and cause chaos.

### 2. Update Multiple Columns

You can change multiple values at once by separating them with commas.

```sql
UPDATE employees
SET salary = 60000,
    department = 'Finance'
WHERE employee_id = 102;
```

### 3. Expressions & Logic

You can also use expressions and functions to calculate new values based on existing data.

```sql
-- Giving everyone in HR a 10% raise
UPDATE employees
SET salary = salary * 1.10
WHERE department = 'HR';
```

---

## Part 4: DELETE — Removing Rows

The `DELETE` statement removes one or more rows from a table... permanently. There’s no “undo” button, so use it wisely.

### 1. Basic DELETE

Common use case: deleting a specific record using its primary key.

```sql
DELETE FROM employees
WHERE employee_id = 101;
```

> [!IMPORTANT]
> **Boom. That row's gone!** Like your Wi-Fi during a thunderstorm.

### 2. The Dangers of Missing WHERE

If you skip the `WHERE` clause, **every row in the table gets deleted**. This is like hitting "Select All" and then "Delete". No mercy.

```sql
-- DANGER ZONE: This clears every record from the table!
DELETE FROM employees;
```

> [!CAUTION]
> Always double-check your conditions to ensure you're targeting exactly what you want gone. One wrong clause and your entire `employees` table looks like a ghost town.

### 3. Key Differences

Unlike `SELECT`, `INSERT`, or `UPDATE`, `DELETE` doesn’t give you back rows. It just... deletes. Recently deleted data is gone permanently unless you have backups or are using transactions.

---

## Part 5: SQL JOINS — Combining Tables

Use `JOIN` to combine data from two or more tables based on related columns.

### 1. Basic JOIN (INNER JOIN)

This is a `JOIN` by default. It only returns rows where the match exists in **both** tables.

```sql
SELECT employees.first_name, department.department_name
FROM employees
JOIN department
ON employees.department = department.department_name;
```

### 2. The Four Main Joins (Venn Logic)

| Join Type | Result |
| :--- | :--- |
| **INNER JOIN** | Match in **both** tables. |
| **LEFT JOIN** | All from Table A + matches from Table B. |
| **RIGHT JOIN** | All from Table B + matches from Table A. |
| **FULL JOIN** | All from both tables (match or no match). |

### 3. Exclusion Joins (IS NULL)

To find data that **doesn't** have a match in the other table, use a `LEFT JOIN` and filter for `NULL`.

```sql
-- Employees without a department
SELECT a.*
FROM employees a
LEFT JOIN department b ON a.department = b.department_name
WHERE b.department_name IS NULL;
```

---

## Part 6: Multi-Table Joins (3+ Tables)

When joining 3 tables, you chain the `JOIN` statements. The order matters!

### Three Table LEFT JOIN (Pokemon Edition ⚡)

```sql
SELECT t.name, p.pokemon, g.gym
FROM trainers t
LEFT JOIN pokemon_types p ON t.type = p.type
LEFT JOIN gyms g ON t.type = g.type;
```

> [!NOTE]
> This combines results from all three tables. If a trainer's type doesn't exist in `gyms` or `pokemon_types`, those columns will simply show `NULL`.

---

## Part 7: UNION — Combining Result Sets

You can combine the results of two or more `SELECT` queries into one result set using `UNION`.

### The Rules of Union:
1.  Columns must have the **same number**.
2.  Columns must be in the **same order**.
3.  Columns must have **compatible data types**.

### UNION vs UNION ALL

| Type | Duplicate Handling |
| :--- | :--- |
| **UNION** | Removes duplicates (slower, cleaner). |
| **UNION ALL** | Keeps everything (faster, messy). |

**Example:**
```sql
-- Get addresses from both patients and customers
SELECT first_name, last_name_patient as last_name, address
FROM patients
UNION
SELECT first_name, last_name_customer as last_name, address
FROM customers;
```

---

## Part 8: JOIN vs UNION — Quick Summary

| **JOIN** 🔗 | **UNION** 🤝 |
| :--- | :--- |
| **Purpose**: Retrieve related data from **multiple tables**. | **Purpose**: Combine results from **different tables** with similar structures. |
| **Structure**: Adds columns horizontally. | **Structure**: Adds rows vertically. |
| **Rule**: Requires a shared key (like `id`). | **Rule**: Requires matching column counts and types. |

---

## Part 9: Subqueries — Queries Inside Queries

Subqueries (also called **Nested Queries** or **Sub-selects**) let you embed one query inside another to filter, calculate, or compare data.

### 1. Scalar Subquery (Returns a single value)

Used when you need to compare a value against a single aggregate result.

**Example: Show price vs average price**
```sql
SELECT
    product_name,
    price,
    (SELECT AVG(price) FROM products) AS avg_price
FROM products;
```

### 2. Column/Row Subquery (Returns a list or set)

Used in conditions like `IN`, `ANY`, or `EXISTS` to filter based on a list of results.

**Example: Find customers who have placed orders**
```sql
SELECT first_name
FROM customers
WHERE customer_id IN (
    SELECT customer_id
    FROM orders
);
```

> [!TIP]
> Some call this **"Queryception"**. While powerful, avoid nesting too deeply as it can become a performance bottleneck for huge datasets.

---

## Quick Pro-Tips 💡

*   **Double-check your WHERE:** Accidentally giving everyone a raise sounds fun — until finance calls.
*   **Transactions:** In production, use `BEGIN` and `COMMIT` to group your changes. If something looks wrong before you commit, you can `ROLLBACK`.
*   **RETURNING:** In PostgreSQL, you can add `RETURNING *` at the end of an INSERT/UPDATE to see exactly what was changed immediately. (Note: `DELETE` can also use `RETURNING` in Postgres to see what was just removed!)

**Example with RETURNING:**
```sql
DELETE FROM employees
WHERE department = 'IT'
RETURNING *;
```

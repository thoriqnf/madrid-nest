# SQL Performance — Indexing & Optimization

---

## Part 1: Fresh Demo Setup

To understand indexing, let's create a fresh, isolated database and a table for a **Supermarket Inventory**.

```sql
-- Step 1: Create a new database for this topic
CREATE DATABASE supermarket_db;

-- Step 2: Create a large inventory table
CREATE TABLE store_inventory (
    item_id        SERIAL PRIMARY KEY,
    item_name      VARCHAR(100),
    category       VARCHAR(50),
    unit_cost      DECIMAL(10,2),
    stock_quantity INT
);

-- Step 3: 🚀 SEED LARGE DATASET (100,000 Rows)
-- This creates 100k records to truly test performance
INSERT INTO store_inventory (item_name, category, unit_cost, stock_quantity)
SELECT 
    'Product ' || i,
    (ARRAY['Fruit', 'Bakery', 'Dairy', 'Meat', 'Vegetable', 'Electronics', 'Beverage'])[floor(random() * 7 + 1)],
    (random() * 100)::DECIMAL(10,2),
    (random() * 500)::INT
FROM generate_series(1, 100000) AS i;
```

---

## Part 2: What is an Index? 🔍

An **Index** is a database structure that speeds up data retrieval by creating quick access paths to table rows.

### Why Use Indexes?
They make `SELECT` queries faster by cutting down how much data the database has to scan.

### The Trade-off ⚖️
*   **Speeds up Reads (`SELECT`)**: Finds data instantly.
*   **Slows down Writes (`INSERT`, `UPDATE`, `DELETE`)**: The database has to update the index every time the data changes.

---

## Part 3: Types of Indexes

| Index Type | When to Use It |
| :--- | :--- |
| **B-Tree** | Most common and widely used (standard). |
| **Hash** | Fast for **exact matches** (`=`). |
| **Bitmap** | Good for columns with **few distinct values** (e.g., `gender`, `status`). |

---

## Part 4: Performance Demo 🏎️💨

Let's test how fast the database searches through 100,000 rows.

### ❌ Test 1: Search Without Index (Sequential Scan)

```sql
-- Use EXPLAIN ANALYZE to see real performance time
EXPLAIN ANALYZE
SELECT * FROM store_inventory WHERE category = 'Electronics';
```

> [!CAUTION]
> **Observation**: You will see **"Seq Scan"** in the result. The database is reading every single page! The "Execution Time" will likely be several milliseconds or even full seconds for huge tables.

### 🛠️ Creating the Index

```sql
-- Creating a B-Tree index on the category column
CREATE INDEX idx_category ON store_inventory (category);
```

### ✅ Test 2: Search With Index (Index Scan)

```sql
EXPLAIN ANALYZE
SELECT * FROM store_inventory WHERE category = 'Electronics';
```

> [!IMPORTANT]
> **Observation**: You'll now see **"Index Scan"**! The database uses the "VIP Pass" (pointers) to skip all irrelevant categories. Execution time will drop significantly (often <1ms).

---

## The "Pasar Malam" Analogy 💡

Think of indexes like the **fast lane at the pasar malam**:
-   **Without Index**: You queue up behind 100,000 people buying kueh just to get to the back.
-   **With Index**: You flash a **VIP Pass** and zoom directly to the stall you want.

---

## Part 5: Verification (Performance Analytics)

In a real environment, you can verify if your index is being used by adding `EXPLAIN` before your query.

```sql
EXPLAIN SELECT * FROM store_inventory WHERE category = 'Dairy';
```

*   **Output shows "Seq Scan"**: No index is being used.
*   **Output shows "Index Scan"**: Success! The database is using your index to find data faster.

---

## Quick Pro-Tips 💡

*   **Don't over-index**: If you index every column, your `INSERT` operations will become painfully slow.
*   **Index the right columns**: Only index columns that appear frequently in `WHERE` and `JOIN` clauses.
*   **Automatic Indexes**: Most databases automatically create an index for your `PRIMARY KEY`.

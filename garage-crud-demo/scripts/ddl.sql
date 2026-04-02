-- DDL Script based on ERD

-- Create Outlets Table
CREATE TABLE IF NOT EXISTS outlets (
    outlet_id SERIAL PRIMARY KEY,
    outlet_name VARCHAR(255) NOT NULL,
    address TEXT,
    phone_number VARCHAR(50)
);

-- Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    email VARCHAR(255) UNIQUE
);

-- Create Services Table
CREATE TABLE IF NOT EXISTS services (
    service_id SERIAL PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    base_price DECIMAL(12, 2) NOT NULL
);

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
    outlet_id INT REFERENCES outlets(outlet_id) ON DELETE CASCADE
);

-- Create Transaction Details Table
CREATE TABLE IF NOT EXISTS transaction_details (
    detail_id SERIAL PRIMARY KEY,
    transaction_id INT REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    service_id INT REFERENCES services(service_id) ON DELETE SET NULL,
    subtotal DECIMAL(12, 2) NOT NULL
);

-- Sample Data (Optional)
INSERT INTO outlets (outlet_name, address, phone_number) VALUES ('Main Garage', '123 Auto St', '555-1234');
INSERT INTO services (service_name, base_price) VALUES ('Oil Change', 50.00), ('Tire Rotation', 30.00);

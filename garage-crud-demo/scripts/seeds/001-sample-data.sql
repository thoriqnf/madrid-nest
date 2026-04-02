-- Sample Data Seeding
INSERT INTO outlets (outlet_name, address, phone_number) 
VALUES ('Main Garage', '123 Auto Street', '555-0101'),
       ('Airport Branch', 'Terminal Rd', '555-0102')
ON CONFLICT DO NOTHING;

INSERT INTO services (service_name, base_price) 
VALUES ('Oil Change', 50.00),
       ('Tire Rotation', 35.00),
       ('Brake Inspection', 120.00)
ON CONFLICT DO NOTHING;

INSERT INTO customers (full_name, phone_number, email) 
VALUES ('John Doe', '555-1111', 'john@example.com'),
       ('Jane Smith', '555-2222', 'jane@example.com')
ON CONFLICT DO NOTHING;

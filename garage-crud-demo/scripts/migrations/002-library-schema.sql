-- Library JOIN Demo Migration
-- Tables: authors, books, members, branches, loans

CREATE TABLE IF NOT EXISTS authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT REFERENCES authors(author_id) ON DELETE SET NULL,
    genre VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS members (
    member_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS branches (
    branch_id SERIAL PRIMARY KEY,
    branch_name VARCHAR(255) NOT NULL,
    city VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS loans (
    loan_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id) ON DELETE CASCADE,
    book_id INT REFERENCES books(book_id) ON DELETE CASCADE,
    branch_id INT REFERENCES branches(branch_id) ON DELETE CASCADE,
    loan_date DATE DEFAULT CURRENT_DATE,
    return_date DATE -- NULL means not returned yet
);

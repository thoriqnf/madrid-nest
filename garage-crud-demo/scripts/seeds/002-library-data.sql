-- Library JOIN Demo Seeding

INSERT INTO authors (name, nationality) 
VALUES ('Harper Lee', 'American'),
       ('George Orwell', 'British'),
       ('J.K. Rowling', 'British'),
       ('Tolkien', 'British')
ON CONFLICT DO NOTHING;

INSERT INTO books (title, author_id, genre) 
VALUES ('To Kill a Mockingbird', 1, 'Classic Fiction'),
       ('1984', 2, 'Dystopian'),
       ('Harry Potter and the Sorcerer Stone', 3, 'Fantasy'),
       ('The Hobbit', 4, 'Adventure'),
       ('Animal Farm', 2, 'Satire'),
       ('Mystery Book', NULL, 'Unknown') -- Book with no author
ON CONFLICT DO NOTHING;

INSERT INTO members (full_name, email) 
VALUES ('Alice Wonderland', 'alice@example.com'),
       ('Mad Hatter', 'hatter@example.com'),
       ('Cheshire Cat', 'cat@example.com'),
       ('Queen of Hearts', 'queen@example.com')
ON CONFLICT DO NOTHING;

INSERT INTO branches (branch_name, city) 
VALUES ('Central Library', 'London'),
       ('North Branch', 'Oxford')
ON CONFLICT DO NOTHING;

INSERT INTO loans (member_id, book_id, branch_id, loan_date, return_date) 
VALUES (1, 1, 1, '2023-01-01', '2023-01-15'), -- Returned
       (1, 2, 1, '2023-02-01', NULL),          -- Still active
       (2, 3, 2, '2023-03-01', NULL),          -- Still active
       (3, 4, 2, '2023-04-10', '2023-04-20'), -- Returned
       (4, 5, 1, '2023-05-01', NULL)           -- Still active
ON CONFLICT DO NOTHING;

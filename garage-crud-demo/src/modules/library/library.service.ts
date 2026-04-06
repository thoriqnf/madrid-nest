import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class LibraryService {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  /**
   * 1. INNER JOIN Example
   * Fetch all books with their author details.
   * Books without authors (NULL author_id) will be excluded.
   */
  async findBooksWithAuthors() {
    const query = `
      SELECT b.book_id, b.title, b.genre, a.name AS author_name, a.nationality
      FROM books b
      INNER JOIN authors a ON b.author_id = a.author_id
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  /**
   * 2. LEFT JOIN Example
   * Fetch all members and their loan records.
   * Members who haven't borrowed any books will still appear (with NULL loan details).
   */
  async findMembersWithLoansStatus() {
    const query = `
      SELECT m.member_id, m.full_name, l.loan_id, l.loan_date, l.return_date
      FROM members m
      LEFT JOIN loans l ON m.member_id = l.member_id
      ORDER BY m.member_id
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  /**
   * 3. Multi-table JOIN Example
   * Fetch details for all loans, including member name, book title, and branch name.
   */
  async findActiveLoanDetails() {
    const query = `
      SELECT 
        l.loan_id, 
        m.full_name AS member_name, 
        b.title AS book_title, 
        br.branch_name,
        l.loan_date
      FROM loans l
      JOIN members m ON l.member_id = m.member_id
      JOIN books b ON l.book_id = b.book_id
      JOIN branches br ON l.branch_id = br.branch_id
      WHERE l.return_date IS NULL
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  /**
   * 4. LEFT JOIN + NULL Check (IS NULL)
   * Fetch books that have NEVER been borrowed.
   */
  async findBooksNeverBorrowed() {
    const query = `
      SELECT b.book_id, b.title
      FROM books b
      LEFT JOIN loans l ON b.book_id = l.book_id
      WHERE l.loan_id IS NULL
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }
}

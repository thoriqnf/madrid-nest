import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateTransactionDto } from './dto/create-transaction.dto';

/**
 * Service to handle shop transactions.
 * Beginners: A "Service" is where we put our business logic and database queries.
 */
@Injectable()
export class TransactionsService {
  /**
   * We inject the DATABASE_POOL to talk to PostgreSQL.
   */
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  /**
   * Fetch all transactions from the database.
   * Beginners: This uses a simple SELECT query.
   */
  async findAll() {
    const query = 'SELECT * FROM transactions ORDER BY date DESC';
    const result = await this.pool.query(query);
    return result.rows;
  }

  /**
   * Create a new transaction record.
   * Beginners: We've simplified this to a basic INSERT.
   * We use $1, $2 to prevent SQL Injection (security best practice).
   */
  async create(dto: CreateTransactionDto) {
    const { customer_id, outlet_id } = dto;
    
    const query = 'INSERT INTO transactions (customer_id, outlet_id) VALUES ($1, $2) RETURNING *';
    const result = await this.pool.query(query, [customer_id, outlet_id]);
    
    return result.rows[0];
  }
}

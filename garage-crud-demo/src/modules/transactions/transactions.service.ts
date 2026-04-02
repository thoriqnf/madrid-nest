import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  /**
   * TODO 7: Fetch all transactions.
   * Hint: SELECT * FROM transactions.
   */
  async findAll() {
    // --- START YOUR CODE HERE ---
    const query = 'SELECT * FROM transactions';
    // --- END YOUR CODE HERE ---
    const result = await this.pool.query(query);
    return result.rows;
  }

  /**
   * TODO 8: Create a new transaction.
   * Hint: INSERT INTO transactions (customer_id, outlet_id) VALUES ($1, $2) RETURNING *.
   */
  async create(dto: CreateTransactionDto) {
    // --- START YOUR CODE HERE ---
    const { customer_id, outlet_id } = dto;
    const query =
      'INSERT INTO transactions (customer_id, outlet_id) VALUES ($1, $2) RETURNING *';
    const result = await this.pool.query(query, [customer_id, outlet_id]);

    return result.rows[0];
    // --- END YOUR CODE HERE ---
  }
}

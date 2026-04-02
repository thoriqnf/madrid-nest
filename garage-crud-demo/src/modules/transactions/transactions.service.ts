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
    return [];
    // --- END YOUR CODE HERE ---
  }

  /**
   * TODO 8: Create a new transaction.
   * Hint: INSERT INTO transactions (customer_id, outlet_id) VALUES ($1, $2) RETURNING *.
   */
  async create(dto: CreateTransactionDto) {
    // --- START YOUR CODE HERE ---
    return null;
    // --- END YOUR CODE HERE ---
  }
}

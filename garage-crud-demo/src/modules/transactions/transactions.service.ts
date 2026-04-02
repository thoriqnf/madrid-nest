import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async findAll() {
    const query = `
      SELECT t.*, 
             json_agg(td.*) as details
      FROM transactions t
      LEFT JOIN transaction_details td ON t.transaction_id = td.transaction_id
      GROUP BY t.transaction_id
      ORDER BY t.date DESC
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  async create(dto: CreateTransactionDto) {
    const { customer_id, outlet_id, details } = dto;
    
    // Get a client from the pool to handle the TRANSACTION block
    const client = await this.pool.connect();
    
    try {
      // START TRANSACTION
      await client.query('BEGIN');

      // 1. Insert the main Transaction record
      const transResult = await client.query(
        'INSERT INTO transactions (customer_id, outlet_id) VALUES ($1, $2) RETURNING *',
        [customer_id, outlet_id],
      );
      const transaction = transResult.rows[0];

      // 2. Insert each Transaction Detail
      const savedDetails: any[] = [];
      for (const item of details) {
        const detailResult = await client.query(
          'INSERT INTO transaction_details (transaction_id, service_id, subtotal) VALUES ($1, $2, $3) RETURNING *',
          [transaction.transaction_id, item.service_id, item.subtotal],
        );
        savedDetails.push(detailResult.rows[0]);
      }

      // COMMIT TRANSACTION (Saves all changes)
      await client.query('COMMIT');
      
      return { ...transaction, details: savedDetails };
    } catch (error) {
      // ROLLBACK TRANSACTION (Cancels all changes if something went wrong)
      await client.query('ROLLBACK');
      throw new InternalServerErrorException('Database Transaction Failed: ' + error.message);
    } finally {
      // Release the client back to the pool
      client.release();
    }
  }
}

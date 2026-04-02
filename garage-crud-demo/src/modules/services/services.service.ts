import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateServiceDto } from './dto/create-service.dto';

export interface ServiceRow {
  service_id: number;
  service_name: string;
  base_price: string;
}

@Injectable()
export class ServicesService {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  /**
   * TODO 2: Get all services from the database.
   * Hint: SELECT * FROM services.
   */
  async findAll(): Promise<ServiceRow[]> {
    // --- START YOUR CODE HERE ---
    try {
      const result = await this.pool.query(
        'SELECT * FROM services ORDER BY service_id DESC',
      );
      console.log('result', result);
      return result.rows;
    } catch (error) {
      console.error('database query failed find all');
      throw error;
    }

    // --- END YOUR CODE HERE ---
  }

  /**
   * TODO 3: Find one service by ID.
   * Hint: Use WHERE service_id = $1.
   */
  async findOne(id: number): Promise<ServiceRow> {
    // --- START YOUR CODE HERE ---
    const result = await this.pool.query(
      'SELECT * FROM services WHERE service_id = $1',
      [id],
    );

    if (result.rows.length === 0) {
      // console.error('id not found');
      throw new NotFoundException(`service with this ID ${id} not found`);
    }
    // --- END YOUR CODE HERE ---
    return result.rows[0];
  }

  /**
   * TODO 4: Create a new service.
   * Hint: INSERT INTO services (name, price) VALUES ($1, $2) RETURNING *.
   */
  async create(dto: CreateServiceDto): Promise<ServiceRow> {
    // --- START YOUR CODE HERE ---
    const { service_name, base_price } = dto;
    const result = await this.pool.query(
      'INSERT INTO services (service_name, base_price) VALUES ($1, $2) RETURNING *',
      [service_name, base_price],
    );
    return result.rows[0];
    // --- END YOUR CODE HERE ---
  }

  /**
   * TODO 5: Update an existing service.
   * Hint: Use UPDATE services SET ... WHERE service_id = $3.
   */
  async update(
    id: number,
    dto: Partial<CreateServiceDto>,
  ): Promise<ServiceRow> {
    // pastikan dulu datanya ada
    const currentService = await this.findOne(id);

    const service_name = dto.service_name ?? currentService.service_name;
    const base_price = dto.base_price ?? currentService.base_price;
    // --- START YOUR CODE HERE ---
    const result = await this.pool.query(
      'UPDATE services SET service_name = $1, base_price = $2 WHERE service_id = $3 RETURNING *',
      [service_name, base_price, id],
    );
    return result.rows[0];
    // --- END YOUR CODE HERE ---
  }

  /**
   * TODO 6: Delete a service.
   * Hint: Use DELETE FROM services WHERE service_id = $1.
   */
  async remove(id: number): Promise<void> {
    const result = await this.pool.query(
      'DELETE FROM services WHERE service_id = $1',
      [id],
    );

    if (result.rowCount === 0) {
      throw new NotFoundException(`service with ID ${id} not found`);
    }
  }
}

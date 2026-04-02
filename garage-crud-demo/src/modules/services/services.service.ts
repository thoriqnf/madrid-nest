import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateServiceDto } from './dto/create-service.dto';

/**
 * Interface definition for a Service row.
 * Beginners: This helps TypeScript understand what "columns" are in our database table.
 */
export interface ServiceRow {
  service_id: number;
  service_name: string;
  base_price: string; // PostgreSQL numeric types come back as strings in JS
}

/**
 * ServicesService handles all logic for Garage Services (like Oil Change, Brake Repair).
 * Beginners: We use @Injectable() so NestJS can manage this class for us.
 */
@Injectable()
export class ServicesService {
  /**
   * DATABASE_POOL is our connection to PostgreSQL.
   * We "Inject" it here so we can use it in our methods.
   */
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  /**
   * Get all services available in the garage.
   */
  async findAll(): Promise<ServiceRow[]> {
    try {
      const result = await this.pool.query('SELECT * FROM services ORDER BY service_id ASC');
      return result.rows;
    } catch (error) {
      console.error('Database Error in findAll:', error);
      throw error;
    }
  }

  /**
   * Find a specific service by its ID.
   * If not found, we throw a "NotFoundException" (404 Error).
   */
  async findOne(id: number): Promise<ServiceRow> {
    const result = await this.pool.query('SELECT * FROM services WHERE service_id = $1', [id]);
    
    if (result.rows.length === 0) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    
    return result.rows[0];
  }

  /**
   * Add a new service to the database.
   * $1 and $2 are placeholders to prevent SQL Injection attacks.
   */
  async create(dto: CreateServiceDto): Promise<ServiceRow> {
    const { service_name, base_price } = dto;
    
    const result = await this.pool.query(
      'INSERT INTO services (service_name, base_price) VALUES ($1, $2) RETURNING *',
      [service_name, base_price],
    );
    
    return result.rows[0];
  }

  /**
   * Update an existing service.
   * COALESCE ($1, service_name) means: Use the new value if provided, otherwise keep the old one.
   */
  async update(id: number, dto: Partial<CreateServiceDto>): Promise<ServiceRow> {
    // First, make sure the service actually exists
    await this.findOne(id);
    
    const { service_name, base_price } = dto;
    const result = await this.pool.query(
      'UPDATE services SET service_name = COALESCE($1, service_name), base_price = COALESCE($2, base_price) WHERE service_id = $3 RETURNING *',
      [service_name, base_price, id],
    );
    
    return result.rows[0];
  }

  /**
   * Delete a service from the database.
   */
  async remove(id: number): Promise<void> {
    const result = await this.pool.query('DELETE FROM services WHERE service_id = $1', [id]);
    
    if (result.rowCount === 0) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
  }
}

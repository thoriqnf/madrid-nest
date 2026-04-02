import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateServiceDto } from './dto/create-service.dto';

// Interface for what the database returns
export interface ServiceRow {
  service_id: number;
  service_name: string;
  base_price: string; // pg returns numeric as string
}

@Injectable()
export class ServicesService {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async findAll(): Promise<ServiceRow[]> {
    try {
      const result = await this.pool.query('SELECT * FROM services ORDER BY service_id ASC');
      return result.rows;
    } catch (error) {
      console.error('Database Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<ServiceRow> {
    const result = await this.pool.query('SELECT * FROM services WHERE service_id = $1', [id]);
    if (result.rows.length === 0) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return result.rows[0];
  }

  async create(dto: CreateServiceDto): Promise<ServiceRow> {
    const { service_name, base_price } = dto;
    const result = await this.pool.query(
      'INSERT INTO services (service_name, base_price) VALUES ($1, $2) RETURNING *',
      [service_name, base_price],
    );
    return result.rows[0];
  }

  async update(id: number, dto: Partial<CreateServiceDto>): Promise<ServiceRow> {
    // Check if exists first
    await this.findOne(id);
    
    const { service_name, base_price } = dto;
    const result = await this.pool.query(
      'UPDATE services SET service_name = COALESCE($1, service_name), base_price = COALESCE($2, base_price) WHERE service_id = $3 RETURNING *',
      [service_name, base_price, id],
    );
    return result.rows[0];
  }

  async remove(id: number): Promise<void> {
    const result = await this.pool.query('DELETE FROM services WHERE service_id = $1', [id]);
    if (result.rowCount === 0) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
  }
}

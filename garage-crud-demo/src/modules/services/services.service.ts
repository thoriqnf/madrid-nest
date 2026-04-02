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
    return []; 
    // --- END YOUR CODE HERE ---
  }

  /**
   * TODO 3: Find one service by ID.
   * Hint: Use WHERE service_id = $1.
   */
  async findOne(id: number): Promise<ServiceRow> {
    // --- START YOUR CODE HERE ---
    const service = null; // Replace with your query logic
    // --- END YOUR CODE HERE ---

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  /**
   * TODO 4: Create a new service.
   * Hint: INSERT INTO services (name, price) VALUES ($1, $2) RETURNING *.
   */
  async create(dto: CreateServiceDto): Promise<ServiceRow> {
    // --- START YOUR CODE HERE ---
    return null as any;
    // --- END YOUR CODE HERE ---
  }

  /**
   * TODO 5: Update an existing service.
   * Hint: Use UPDATE services SET ... WHERE service_id = $3.
   */
  async update(id: number, dto: Partial<CreateServiceDto>): Promise<ServiceRow> {
    const { service_name, base_price } = dto;
    // --- START YOUR CODE HERE ---
    return null as any;
    // --- END YOUR CODE HERE ---
  }

  /**
   * TODO 6: Delete a service.
   * Hint: Use DELETE FROM services WHERE service_id = $1.
   */
  async remove(id: number): Promise<void> {
    // --- START YOUR CODE HERE ---
    
    // --- END YOUR CODE HERE ---
  }
}

import { IsInt } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a transaction.
 * Beginners: A DTO defines the shape of data coming from the client (Postman/Frontend).
 * We use "class-validator" decorators like @IsInt() to automatically check the data.
 */
export class CreateTransactionDto {
  @IsInt()
  customer_id: number;

  @IsInt()
  outlet_id: number;
}

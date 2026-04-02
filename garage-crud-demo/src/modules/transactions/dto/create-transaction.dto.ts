import { IsInt, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

class TransactionDetailDto {
  @IsInt()
  service_id: number;

  @IsNumber()
  @Min(0)
  subtotal: number;
}

export class CreateTransactionDto {
  @IsInt()
  customer_id: number;

  @IsInt()
  outlet_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionDetailDto)
  details: TransactionDetailDto[];
}

import { IsString, IsNumber, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  service_name: string;

  @IsNumber()
  @Min(0)
  base_price: number;
}

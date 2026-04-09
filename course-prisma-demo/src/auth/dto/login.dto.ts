import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * TODO ADV AUTH: 2.2 - Validation decorators
 */

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

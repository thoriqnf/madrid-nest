import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * TODO ADV AUTH: 2.1 - Validation decorators
 */

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

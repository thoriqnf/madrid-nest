import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * TODO ADV AUTH: 2.1 - Validation decorators
 */

export class RegisterDto {
  email: string;
  name: string;
  password: string;
}

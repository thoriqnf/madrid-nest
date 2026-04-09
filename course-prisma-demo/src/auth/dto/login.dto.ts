import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * TODO ADV AUTH: 2.2 - Validation decorators
 */

export class LoginDto {
  email: string;
  password: string;
}

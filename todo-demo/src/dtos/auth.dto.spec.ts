import { ValidationPipe, ArgumentMetadata } from '@nestjs/common';
import { AuthDto } from './auth.dto';

describe('AuthDto Validation', () => {
  const target: ValidationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });

  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: AuthDto,
    data: '',
  };

  // TODO ADV Testing: 2.1 Valid DTO
  it('should validate a correct AuthDto', async () => {
    // Logic goes here
  });

  // TODO ADV Testing: 2.2 Invalid Email
  it('should fail when email is invalid', async () => {
    // Logic goes here
  });

  // TODO ADV Testing: 2.3 Password Min Length
  it('should fail when password is too short', async () => {
    // Logic goes here
  });
});

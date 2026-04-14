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
    const dto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    };

    await expect(target.transform(dto, metadata)).resolves.not.toThrow();
  });

  // TODO ADV Testing: 2.2 Invalid Email
  it('should fail when email is invalid', async () => {
    const dto = {
      email: 'invalid-email',
      password: 'password123',
    };

    await expect(target.transform(dto, metadata)).rejects.toThrow();
  });

  // TODO ADV Testing: 2.3 Password Min Length
  it('should fail when password is too short', async () => {
    const dto = {
      email: 'test@example.com',
      password: '123',
    };

    await expect(target.transform(dto, metadata)).rejects.toThrow();
  });
});

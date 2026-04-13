import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  // // TODO Testing: 2.7 Mock Pattern
  const mockTokens = {
    access_token: 'at',
    refresh_token: 'rt',
  };

  const mockAuthService = {
    signup: jest.fn().mockResolvedValue(mockTokens),
    signin: jest.fn().mockResolvedValue(mockTokens),
    logout: jest.fn().mockResolvedValue(true),
    refreshTokens: jest.fn().mockResolvedValue(mockTokens),
  };

  beforeEach(async () => {
    // // TODO Testing: 1.6 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // // TODO Testing: 3.6 Async/Await
  describe('signup', () => {
    it('should call signup and return tokens', async () => {
      // // TODO Testing: 5.6 Business Logic / Controller logic
      const dto = { email: 'test@test.com', password: 'password', name: 'Test' };
      const result = await controller.signup(dto);

      expect(result).toEqual(mockTokens);
      expect(service.signup).toHaveBeenCalledWith(dto);
    });
  });

  describe('signin', () => {
    it('should call signin and return tokens', async () => {
      const dto = { email: 'test@test.com', password: 'password' };
      const result = await controller.signin(dto);

      expect(result).toEqual(mockTokens);
      expect(service.signin).toHaveBeenCalledWith(dto);
    });
  });
});

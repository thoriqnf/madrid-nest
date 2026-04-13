import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  // TODO Testing: 2.7 Mock Pattern
  const mockTokens = {};

  const mockAuthService = {
    signup: jest.fn(),
    signin: jest.fn(),
    logout: jest.fn(),
    refreshTokens: jest.fn(),
  };

  beforeEach(async () => {
    // TODO Testing: 1.6 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      controllers: [], // TODO: Register AuthController
      providers: [
        // TODO: Register AuthService mock
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // TODO Testing: 3.6 Async/Await
  describe('signup', () => {
    it('should call signup and return tokens', async () => {
      // TODO Testing: 5.6 Business Logic / Controller logic
    });
  });

  describe('signin', () => {
    it('should call signin and return tokens', async () => {
      // Fill implementation here
    });
  });
});

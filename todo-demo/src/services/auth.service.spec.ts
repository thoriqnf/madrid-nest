import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  // TODO Testing: 2.5 Mock Pattern
  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    updateHashedRefreshToken: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    // TODO Testing: 1.4 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // TODO: Register AuthService and its mock dependencies
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO Testing: 3.4 Async/Await
  describe('signup', () => {
    it('should throw ConflictException if user exists', async () => {
      // TODO Testing: 4.1 Error Handling
    });

    it('should create a new user and return tokens', async () => {
      // TODO Testing: 5.4 Business Logic
    });
  });

  describe('signin', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      // Fill implementation here
    });
  });
});

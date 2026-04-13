import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  // // TODO Testing: 2.5 Mock Pattern
  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    updateHashedRefreshToken: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('mockToken'),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'JWT_SECRET') return 'at-secret';
      if (key === 'RT_SECRET') return 'rt-secret';
      return null;
    }),
  };

  beforeEach(async () => {
    // // TODO Testing: 1.4 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // // TODO Testing: 3.4 Async/Await
  describe('signup', () => {
    it('should throw ConflictException if user exists', async () => {
      // // TODO Testing: 4.1 Error Handling
      mockUsersService.findByEmail.mockResolvedValue({ id: 1 });
      const dto = { email: 'test@test.com', password: 'password', name: 'Test' };

      await expect(service.signup(dto)).rejects.toThrow(ConflictException);
    });

    it('should create a new user and return tokens', async () => {
      // // TODO Testing: 5.4 Business Logic
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({ id: 1, email: 'test@test.com' });

      const dto = { email: 'test@test.com', password: 'password', name: 'Test' };
      const result = await service.signup(dto);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(mockUsersService.create).toHaveBeenCalled();
    });
  });

  describe('signin', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      const dto = { email: 'test@test.com', password: 'password' };

      await expect(service.signin(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../repositories/users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  // TODO Testing: 2.4 Mock Pattern
  const mockUser = {};

  const mockRepository = {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    // TODO Testing: 1.3 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // TODO: Register UsersService and UsersRepository mock
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO Testing: 3.3 Async/Await
  it('should find a user by email', async () => {
    // TODO Testing: 5.3 Business Logic
  });

  it('should create a user', async () => {
    // Fill implementation here
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let prisma: PrismaService;

  // TODO Testing: 2.1 Mock Pattern
  const mockUser = {};

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    // TODO Testing: 1.1 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // TODO: Register UsersRepository and PrismaService mock
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // TODO Testing: 3.1 Async/Await
  it('should find a user by email', async () => {
    // TODO Testing: 5.1 Business Logic / Repository Logic
  });

  it('should create a user', async () => {
    // Fill implementation here
  });
});

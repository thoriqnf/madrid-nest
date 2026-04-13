import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let prisma: PrismaService;

  // // TODO Testing: 2.1 Mock Pattern
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn().mockResolvedValue(mockUser),
      create: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue(mockUser),
      delete: jest.fn().mockResolvedValue(mockUser),
    },
  };

  beforeEach(async () => {
    // // TODO Testing: 1.1 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // // TODO Testing: 3.1 Async/Await
  it('should find a user by email', async () => {
    // // TODO Testing: 5.1 Business Logic / Repository Logic
    const email = 'test@example.com';
    const result = await repository.findUnique({ email });
    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
  });

  it('should create a user', async () => {
    const data = { email: 'new@example.com', password: 'password' };
    await repository.create(data);
    expect(prisma.user.create).toHaveBeenCalledWith({ data });
  });
});

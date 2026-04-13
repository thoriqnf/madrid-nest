import { Test, TestingModule } from '@nestjs/testing';
import { TodosRepository } from './todos.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('TodosRepository', () => {
  let repository: TodosRepository;
  let prisma: PrismaService;

  // TODO Testing: 2.2 Mock Pattern
  const mockTodo = {};

  // TODO Testing: 2.3 Mock Implementation
  const mockPrismaService = {
    todo: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    // TODO Testing: 1.2 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // TODO: Register TodosRepository and PrismaService mock
      ],
    }).compile();

    repository = module.get<TodosRepository>(TodosRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // TODO Testing: 3.2 Async/Await
  it('should call prisma.todo.create', async () => {
    // TODO Testing: 5.2 Business Logic / Repository Logic
  });

  it('should call prisma.todo.findMany', async () => {
    // Fill implementation here
  });
});

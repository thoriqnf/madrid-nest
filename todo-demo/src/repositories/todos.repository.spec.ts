import { Test, TestingModule } from '@nestjs/testing';
import { TodosRepository } from './todos.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('TodosRepository', () => {
  let repository: TodosRepository;
  let prisma: PrismaService;

  // TODO Testing: 2.2 Mock Pattern
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    userId: 1,
  };

  // TODO Testing: 2.3 Mock Implementation
  const mockPrismaService = {
    todo: {
      create: jest.fn().mockResolvedValue(mockTodo),
      findMany: jest.fn().mockResolvedValue([mockTodo]),
      findUnique: jest.fn().mockResolvedValue(mockTodo),
      update: jest.fn().mockResolvedValue(mockTodo),
      delete: jest.fn().mockResolvedValue(mockTodo),
    },
  };

  beforeEach(async () => {
    // TODO Testing: 1.2 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
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
    const data = { title: 'Test Todo', user: { connect: { id: 1 } } };
    await repository.create(data);
    expect(prisma.todo.create).toHaveBeenCalledWith({ data });
  });

  it('should call prisma.todo.findMany', async () => {
    const where = { userId: 1 };
    await repository.findAll(where);
    expect(prisma.todo.findMany).toHaveBeenCalledWith({ where });
  });

  // TODO ADV Testing: 8.1 Simulating Prisma Errors
  it('should throw error when prisma delete fails for non-existent record', async () => {
    const error = new Prisma.PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: '7.7.0',
    });
    mockPrismaService.todo.delete.mockRejectedValueOnce(error);

    await expect(repository.delete({ id: 999 })).rejects.toThrow();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TodosRepository } from './todos.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('TodosRepository', () => {
  let repository: TodosRepository;
  let prisma: PrismaService;

  // // TODO Testing: 2.0 Mock Pattern
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    userId: 1,
  };

  // // TODO Testing: 2.1 Mock Implementation
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
    // // TODO Testing: 1.0 Dependency Injection
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

  // // TODO Testing: 3.0 Async/Await
  it('should call prisma.todo.create', async () => {
    // // TODO Testing: 5.0 Business Logic / Repository Logic
    const data = { title: 'Test Todo', user: { connect: { id: 1 } } };
    await repository.create(data);
    expect(prisma.todo.create).toHaveBeenCalledWith({ data });
  });

  it('should call prisma.todo.findMany', async () => {
    const where = { userId: 1 };
    await repository.findAll(where);
    expect(prisma.todo.findMany).toHaveBeenCalledWith({ where });
  });
});

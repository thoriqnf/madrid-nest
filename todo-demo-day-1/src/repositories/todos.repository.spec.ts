import { Test, TestingModule } from '@nestjs/testing';
import { TodosRepository } from './todos.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('TodosRepository', () => {
  let repository: TodosRepository;
  let prisma: PrismaService;

  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    userId: 1,
  };

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

  it('should call prisma.todo.create', async () => {
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

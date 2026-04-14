import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodosRepository } from '../repositories/todos.repository';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('TodosService', () => {
  let service: TodosService;
  let repository: TodosRepository;

  // TODO Testing: 2.6 Mock Pattern
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockResolvedValue(mockTodo),
    findAll: jest.fn().mockResolvedValue([mockTodo]),
    findUnique: jest.fn().mockResolvedValue(mockTodo),
    update: jest.fn().mockResolvedValue({ ...mockTodo, completed: true }),
    delete: jest.fn().mockResolvedValue(mockTodo),
  };

  beforeEach(async () => {
    // TODO Testing: 1.5 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: TodosRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get<TodosRepository>(TodosRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO Testing: 3.5 Async/Await
  describe('create', () => {
    it('should create a todo', async () => {
      // TODO Testing: 5.5 Business Logic
      const result = await service.create(1, 'Test Todo', 'Test Description');
      expect(result).toEqual(mockTodo);
      expect(repository.create).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a todo if it exists and belongs to the user', async () => {
      const result = await service.findOne(1, 1);
      expect(result).toEqual(mockTodo);
    });

    it('should throw NotFoundException if todo does not exist', async () => {
      // TODO Testing: 4.2 Error Handling
      mockRepository.findUnique.mockResolvedValueOnce(null);
      await expect(service.findOne(1, 1)).rejects.toThrow(NotFoundException);
    });

    // TODO ADV Testing: 7.1 Ownership Failure (Forbidden)
    it('should throw ForbiddenException if todo does not belong to the user', async () => {
      mockRepository.findUnique.mockResolvedValueOnce({ ...mockTodo, userId: 2 });
      await expect(service.findOne(1, 1)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    // TODO ADV Testing: 7.2 Security Propagation
    it('should throw ForbiddenException when updating a todo that belongs to another user', async () => {
      mockRepository.findUnique.mockResolvedValueOnce({ ...mockTodo, userId: 2 });
      const updateData = { title: 'Illegal Update' };

      await expect(service.update(1, 1, updateData)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});

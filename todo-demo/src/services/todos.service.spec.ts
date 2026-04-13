import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodosRepository } from '../repositories/todos.repository';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('TodosService', () => {
  let service: TodosService;
  let repository: TodosRepository;

  // TODO Testing: 2.6 Mock Pattern
  const mockTodo = {};

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    // TODO Testing: 1.5 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // TODO: Register TodosService and TodosRepository mock
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
    });
  });

  describe('findOne', () => {
    it('should return a todo if it exists and belongs to the user', async () => {
      // Fill implementation here
    });

    it('should throw NotFoundException if todo does not exist', async () => {
      // TODO Testing: 4.2 Error Handling
    });

    it('should throw ForbiddenException if todo does not belong to the user', async () => {
      // Fill implementation here
    });
  });
});

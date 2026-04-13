import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from '../services/todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  // TODO Testing: 2.8 Mock Pattern
  const mockTodo = {};

  const mockTodosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    // TODO Testing: 1.7 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      controllers: [], // TODO: Register TodosController
      providers: [
        // TODO: Register TodosService mock
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // TODO Testing: 3.7 Async/Await
  describe('create', () => {
    it('should create a todo', async () => {
      // TODO Testing: 5.7 Business Logic / Controller logic
    });
  });

  describe('findAll', () => {
    it('should return all todos for a user', async () => {
      // Fill implementation here
    });
  });
});

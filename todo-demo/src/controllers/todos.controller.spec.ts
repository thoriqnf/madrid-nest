import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from '../services/todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  // // TODO Testing: 2.8 Mock Pattern
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    userId: 1,
  };

  const mockTodosService = {
    create: jest.fn().mockResolvedValue(mockTodo),
    findAll: jest.fn().mockResolvedValue([mockTodo]),
    findOne: jest.fn().mockResolvedValue(mockTodo),
    update: jest.fn().mockResolvedValue(mockTodo),
    delete: jest.fn().mockResolvedValue(mockTodo),
  };

  beforeEach(async () => {
    // // TODO Testing: 1.7 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // // TODO Testing: 3.7 Async/Await
  describe('create', () => {
    it('should create a todo', async () => {
      // // TODO Testing: 5.7 Business Logic / Controller logic
      const result = await controller.create(1, 'Test Todo', 'Description');
      expect(result).toEqual(mockTodo);
      expect(service.create).toHaveBeenCalledWith(1, 'Test Todo', 'Description');
    });
  });

  describe('findAll', () => {
    it('should return all todos for a user', async () => {
      const result = await controller.findAll(1);
      expect(result).toEqual([mockTodo]);
      expect(service.findAll).toHaveBeenCalledWith(1);
    });
  });
});

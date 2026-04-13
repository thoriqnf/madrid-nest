import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../repositories/users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  // // TODO Testing: 2.4 Mock Pattern
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
  };

  const mockRepository = {
    findUnique: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    // // TODO Testing: 1.3 Dependency Injection
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // // TODO Testing: 3.3 Async/Await
  it('should find a user by email', async () => {
    // // TODO Testing: 5.3 Business Logic
    const email = 'test@example.com';
    const result = await service.findByEmail(email);
    expect(result).toEqual(mockUser);
    expect(repository.findUnique).toHaveBeenCalledWith({ email });
  });

  it('should create a user', async () => {
    const data = { email: 'new@example.com', password: 'password' };
    await service.create(data);
    expect(repository.create).toHaveBeenCalledWith(data);
  });
});

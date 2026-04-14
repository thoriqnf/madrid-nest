import { AtStrategy } from './at.strategy';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('AtStrategy', () => {
  let strategy: AtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AtStrategy,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('at-secret') },
        },
      ],
    }).compile();

    strategy = module.get<AtStrategy>(AtStrategy);
  });

  // TODO ADV Testing: 6.1 Payload Validation
  it('should return the payload when validated', () => {
    const payload = { sub: 1, email: 'test@test.com' };
    expect(strategy.validate(payload)).toEqual(payload);
  });
});

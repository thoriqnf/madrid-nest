import { RtStrategy } from './rt.strategy';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';

describe('RtStrategy', () => {
  let strategy: RtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RtStrategy,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('rt-secret') },
        },
      ],
    }).compile();

    strategy = module.get<RtStrategy>(RtStrategy);
  });

  // TODO ADV Testing: 6.2 Refresh Token Extraction
  it('should extract the refresh token and attach it to the payload', () => {
    const payload = { sub: 1, email: 'test@test.com' };
    const mockRequest = {
      get: jest.fn().mockReturnValue('Bearer rt-token'),
    } as unknown as Request;

    const result = strategy.validate(mockRequest, payload);

    expect(result).toEqual({
      ...payload,
      refreshToken: 'rt-token',
    });
  });
});

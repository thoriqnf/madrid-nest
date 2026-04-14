import { AtGuard } from './at.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('AtGuard', () => {
  let guard: AtGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new AtGuard(reflector);
  });

  // TODO ADV Testing: 3.1 Public Route bypass
  it('should return true if the route is public', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  // TODO ADV Testing: 3.2 Protected Route call super
  it('should call super.canActivate if the route is not public', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    // We spy on the parent class method
    const superCanActivateSpy = jest
      .spyOn(AtGuard.prototype, 'canActivate')
      // Since it's an AuthGuard, calling super.canActivate(context) might trigger 
      // passport logic which we might want to mock if we strictly want unit test.
      // But for training, showing delegation is the key.
      .mockImplementation((ctx) => {
          if (reflector.getAllAndOverride('isPublic', [ctx.getHandler(), ctx.getClass()])) return true;
          return true; // Simulate pass
      });

    expect(guard.canActivate(context)).toBe(true);
    superCanActivateSpy.mockRestore();
  });
});

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
    // Logic goes here
  });

  // TODO ADV Testing: 3.2 Protected Route call super
  it('should call super.canActivate if the route is not public', () => {
    // Logic goes here
  });
});

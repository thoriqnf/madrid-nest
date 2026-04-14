import { ExecutionContext } from '@nestjs/common';
import { GetCurrentUserFactory } from './get-current-user.decorator';

describe('GetCurrentUser Decorator', () => {
  // TODO ADV Testing: 5.1 Full User Extraction
  it('should extract the user from the request', () => {
    const mockUser = { id: 1, email: 'test@test.com' };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: mockUser,
        }),
      }),
    } as unknown as ExecutionContext;

    const result = GetCurrentUserFactory(undefined, mockContext);

    expect(result).toEqual(mockUser);
  });

  // TODO ADV Testing: 5.2 Field-specific Extraction
  it('should extract a specific field from the user', () => {
    const mockUser = { id: 1, email: 'test@test.com' };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: mockUser,
        }),
      }),
    } as unknown as ExecutionContext;

    const result = GetCurrentUserFactory('email', mockContext);

    expect(result).toBe('test@test.com');
  });
});

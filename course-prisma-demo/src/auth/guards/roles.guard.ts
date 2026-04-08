import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // TODO Auth: 3.2 - Implement Role-based Access Logic
    // 1. Extract required roles using reflector
    // 2. If no roles are required, return true
    // 3. Get the user from the request
    // 4. Check if user's role matches any of the required roles
    // 5. Throw ForbiddenException if role check fails
    return true;
  }
}

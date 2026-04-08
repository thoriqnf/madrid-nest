import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // TODO Auth: 2.2 - Implement Public Access Override in Guard
    // 1. Check if the handler or class is marked with @Public()
    // 2. If it is public, return true
    // 3. Otherwise, use the default AuthGuard('jwt') protection
    return super.canActivate(context);
  }
}

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * TODO ADV AUTH: 3.2 - Refresh Auth Guard
 */
@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {}

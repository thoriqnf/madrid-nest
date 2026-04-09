import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * TODO ADV AUTH: 3.1 - Refresh Token Strategy
 */
@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET', 'refresh-secret'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    // TODO: Extract refresh token from header and return it with the payload
    return payload;
  }
}

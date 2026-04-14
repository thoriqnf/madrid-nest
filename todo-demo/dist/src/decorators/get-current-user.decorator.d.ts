import { ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '../types/auth.types';
export declare const GetCurrentUserFactory: (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => any;
export declare const GetCurrentUser: (...dataOrPipes: (keyof import("../types/auth.types").JwtPayload | "refreshToken" | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;

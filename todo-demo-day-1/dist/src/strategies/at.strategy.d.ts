import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/auth.types';
declare const AtStrategy_base: any;
export declare class AtStrategy extends AtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};

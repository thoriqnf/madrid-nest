import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const AtGuard_base: any;
export declare class AtGuard extends AtGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): any;
}
export {};

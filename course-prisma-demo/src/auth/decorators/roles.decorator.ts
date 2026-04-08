import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
// TODO Auth: 3.1 - Create Roles Decorator using SetMetadata
export const Roles = (...roles: string[]) => (...args: any[]) => {};

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// TODO Auth: 1.5 - Create Public Decorator using SetMetadata
export const Public = () => (...args: any[]) => {};

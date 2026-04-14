import { UsersRepository } from '../repositories/users.repository';
import { User, Prisma } from '@prisma/client';
export declare class UsersService {
    private repository;
    constructor(repository: UsersRepository);
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    updateHashedRefreshToken(userId: number, hashedRt: string | null): Promise<void>;
}

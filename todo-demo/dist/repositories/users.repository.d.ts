import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
export declare class UsersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findUnique(where: Prisma.UserWhereUniqueInput): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    delete(where: Prisma.UserWhereUniqueInput): Promise<User>;
}

import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<void>;
    findOne(id: number): Promise<void>;
    create(data: {
        email: string;
        name: string;
        bio?: string;
        phone?: string;
    }): Promise<void>;
    update(id: number, data: {
        name?: string;
        bio?: string;
        phone?: string;
    }): Promise<void>;
    remove(id: number): Promise<void>;
}

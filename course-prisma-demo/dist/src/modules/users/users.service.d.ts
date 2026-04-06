import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        profile: {
            id: number;
            bio: string | null;
            avatarUrl: string | null;
            phone: string | null;
            userId: number;
        } | null;
    } & {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<({
        profile: {
            id: number;
            bio: string | null;
            avatarUrl: string | null;
            phone: string | null;
            userId: number;
        } | null;
    } & {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    create(data: {
        email: string;
        name: string;
        bio?: string;
        phone?: string;
    }): Promise<{
        profile: {
            id: number;
            bio: string | null;
            avatarUrl: string | null;
            phone: string | null;
            userId: number;
        } | null;
    } & {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, data: {
        name?: string;
        bio?: string;
        phone?: string;
    }): Promise<{
        profile: {
            id: number;
            bio: string | null;
            avatarUrl: string | null;
            phone: string | null;
            userId: number;
        } | null;
    } & {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

import { PrismaService } from '../prisma/prisma.service';
import { Todo, Prisma } from '@prisma/client';
export declare class TodosRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.TodoCreateInput): Promise<Todo>;
    findAll(where: Prisma.TodoWhereInput): Promise<Todo[]>;
    findUnique(where: Prisma.TodoWhereUniqueInput): Promise<Todo | null>;
    update(params: {
        where: Prisma.TodoWhereUniqueInput;
        data: Prisma.TodoUpdateInput;
    }): Promise<Todo>;
    delete(where: Prisma.TodoWhereUniqueInput): Promise<Todo>;
}

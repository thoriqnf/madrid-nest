import { TodosRepository } from '../repositories/todos.repository';
import { Todo } from '@prisma/client';
export declare class TodosService {
    private repository;
    constructor(repository: TodosRepository);
    create(userId: number, title: string, description?: string): Promise<Todo>;
    findAll(userId: number): Promise<Todo[]>;
    findOne(userId: number, id: number): Promise<Todo>;
    update(userId: number, id: number, data: {
        title?: string;
        description?: string;
        completed?: boolean;
    }): Promise<Todo>;
    delete(userId: number, id: number): Promise<Todo>;
}

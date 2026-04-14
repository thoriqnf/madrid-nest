import { TodosService } from '../services/todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(userId: number, title: string, description?: string): Promise<{
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(userId: number, id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: number, id: number, data: {
        title?: string;
        description?: string;
        completed?: boolean;
    }): Promise<{
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(userId: number, id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

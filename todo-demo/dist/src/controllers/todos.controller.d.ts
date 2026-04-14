import { TodosService } from '../services/todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(userId: number, title: string, description?: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
    }>;
    findAll(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
    }[]>;
    findOne(userId: number, id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
    }>;
    update(userId: number, id: number, data: {
        title?: string;
        description?: string;
        completed?: boolean;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
    }>;
    remove(userId: number, id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: number;
    }>;
}

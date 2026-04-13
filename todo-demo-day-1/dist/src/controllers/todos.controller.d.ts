import { TodosService } from '../services/todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(userId: number, title: string, description?: string): Promise<Todo>;
    findAll(userId: number): Promise<Todo[]>;
    findOne(userId: number, id: number): Promise<Todo>;
    update(userId: number, id: number, data: {
        title?: string;
        description?: string;
        completed?: boolean;
    }): Promise<Todo>;
    remove(userId: number, id: number): Promise<Todo>;
}

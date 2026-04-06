import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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

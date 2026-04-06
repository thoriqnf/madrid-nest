import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<any>;
    create(data: {
        name: string;
        description?: string;
    }): Promise<any>;
}

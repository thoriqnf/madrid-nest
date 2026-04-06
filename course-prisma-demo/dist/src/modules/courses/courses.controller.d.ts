import { CoursesService } from './courses.service';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    getStats(): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    create(data: {
        title: string;
        price: number;
        instructorId: number;
        categoryId: number;
    }): Promise<any>;
    addLesson(id: number, data: {
        title: string;
        content: string;
        order: number;
        durationMinutes: number;
    }): Promise<any>;
    enrollUser(id: number, userId: number): Promise<any>;
}

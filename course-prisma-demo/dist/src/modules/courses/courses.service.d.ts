import { PrismaService } from '../../prisma/prisma.service';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    create(data: {
        title: string;
        price: number;
        instructorId: number;
        categoryId: number;
    }): Promise<any>;
    addLesson(courseId: number, data: {
        title: string;
        content: string;
        order: number;
        durationMinutes: number;
    }): Promise<any>;
    enrollUser(courseId: number, userId: number): Promise<any>;
    getCourseStats(): Promise<any>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.course.findMany({
            include: {
                instructor: { select: { name: true } },
                category: { select: { name: true } },
                _count: {
                    select: { enrollments: true, lessons: true },
                },
            },
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                lessons: { orderBy: { order: 'asc' } },
                enrollments: {
                    include: {
                        user: { select: { name: true, email: true } },
                    },
                },
            },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async create(data) {
        return this.prisma.course.create({
            data: {
                title: data.title,
                price: data.price,
                instructor: { connect: { id: data.instructorId } },
                category: { connect: { id: data.categoryId } },
            },
        });
    }
    async addLesson(courseId, data) {
        return this.prisma.lesson.create({
            data: {
                ...data,
                course: { connect: { id: courseId } },
            },
        });
    }
    async enrollUser(courseId, userId) {
        return this.prisma.enrollment.create({
            data: {
                course: { connect: { id: courseId } },
                user: { connect: { id: userId } },
            },
        });
    }
    async getCourseStats() {
        return this.prisma.course.groupBy({
            by: ['categoryId'],
            _count: {
                _all: true,
            },
            _avg: {
                price: true,
            },
        });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map
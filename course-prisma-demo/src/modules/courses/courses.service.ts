import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, published?: boolean) {
    return this.prisma.course.findMany({
      where: {
        AND: [
          search ? { title: { contains: search, mode: 'insensitive' } } : {},
          published !== undefined ? { published } : {},
        ],
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        _count: {
          select: { enrollments: true, lessons: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        author: true,
        lessons: {
          orderBy: { order: 'asc' },
        },
        enrollments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async create(data: {
    title: string;
    description?: string;
    published?: boolean;
    authorId: number;
    lessons?: { title: string; content?: string; order: number }[];
  }) {
    const { lessons, authorId, ...courseData } = data;

    return this.prisma.course.create({
      data: {
        ...courseData,
        author: {
          connect: { id: authorId },
        },
        lessons: lessons
          ? {
              create: lessons,
            }
          : undefined,
      },
      include: {
        author: true,
        lessons: true,
      },
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      published?: boolean;
    },
  ) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}

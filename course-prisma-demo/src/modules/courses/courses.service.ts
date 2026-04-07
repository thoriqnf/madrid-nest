import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  // ── GET all courses ────────────────────────────────────────────────
  // Demonstrates: Multi-table JOIN across 4 tables (Course → Author → Lessons → Categories)
  async findAll() {
    return this.prisma.course.findMany({
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        categories: true,
        lessons: { orderBy: { order: 'asc' } },
        _count: { select: { enrollments: true } },
      },
    });
  }

  // ── GET one course ─────────────────────────────────────────────────
  // Demonstrates: Deep include with 4+ tables
  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true },
          // Could also include author.profile for even deeper join
        },
        categories: true,
        lessons: { orderBy: { order: 'asc' } },
        enrollments: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }
    return course;
  }

  // ── CREATE course ──────────────────────────────────────────────────
  // Demonstrates: Nested create (Course + Lessons) + connect (Categories, Author)
  async create(data: {
    title: string;
    description?: string;
    published?: boolean;
    authorId: number;
    categoryIds?: number[];
    lessons?: { title: string; content?: string; order: number }[];
  }) {
    return this.prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        published: data.published ?? false,
        author: { connect: { id: data.authorId } },
        categories: data.categoryIds
          ? { connect: data.categoryIds.map((id) => ({ id })) }
          : undefined,
        lessons: data.lessons
          ? { createMany: { data: data.lessons } }
          : undefined,
      },
      include: {
        author: { select: { id: true, name: true } },
        categories: true,
        lessons: { orderBy: { order: 'asc' } },
      },
    });
  }

  // ── UPDATE course ──────────────────────────────────────────────────
  // Demonstrates: Update + set (replace all categories)
  async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      published?: boolean;
      categoryIds?: number[];
    },
  ) {
    return this.prisma.course.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        published: data.published,
        // `set` replaces ALL linked categories with the new list
        categories: data.categoryIds
          ? { set: data.categoryIds.map((id) => ({ id })) }
          : undefined,
      },
      include: {
        author: { select: { id: true, name: true } },
        categories: true,
        lessons: { orderBy: { order: 'asc' } },
      },
    });
  }

  // ── DELETE course ──────────────────────────────────────────────────
  // Demonstrates: Cascade — deleting a course also removes its Lessons & Enrollments
  async remove(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}

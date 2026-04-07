import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // ── GET all categories ─────────────────────────────────────────────
  // Demonstrates: _count on implicit M2M relation
  async findAll() {
    return this.prisma.category.findMany({
      include: {
        _count: { select: { courses: true } },
      },
    });
  }

  // ── GET one category with its courses ──────────────────────────────
  // Demonstrates: Reverse M2M include (Category → Courses → Author + Lessons)
  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        courses: {
          include: {
            author: { select: { id: true, name: true } },
            _count: { select: { lessons: true, enrollments: true } },
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  // ── CREATE category ────────────────────────────────────────────────
  async create(data: { name: string; slug: string }) {
    return this.prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });
  }

  // ── DELETE category ────────────────────────────────────────────────
  // Demonstrates: Implicit M2M — deleting a category simply unlinks it from courses
  // (courses themselves are NOT deleted)
  async remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}

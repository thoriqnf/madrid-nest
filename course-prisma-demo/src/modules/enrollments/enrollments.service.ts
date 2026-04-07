import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  // ── GET all enrollments ────────────────────────────────────────────
  // Demonstrates: Querying an explicit M2M join table with related data
  async findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        course: {
          select: {
            id: true,
            title: true,
            author: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  }

  // ── GET one enrollment ─────────────────────────────────────────────
  async findOne(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, profile: true },
        },
        course: {
          include: {
            lessons: { orderBy: { order: 'asc' } },
            categories: true,
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment #${id} not found`);
    }
    return enrollment;
  }

  // ── ENROLL (create) ────────────────────────────────────────────────
  // Demonstrates: Creating a record in an explicit M2M join table
  async enroll(data: { userId: number; courseId: number }) {
    return this.prisma.enrollment.create({
      data: {
        user: { connect: { id: data.userId } },
        course: { connect: { id: data.courseId } },
      },
      include: {
        user: { select: { id: true, name: true } },
        course: { select: { id: true, title: true } },
      },
    });
  }

  // ── UPDATE progress ────────────────────────────────────────────────
  // Demonstrates: Updating extra fields on the join table
  async updateProgress(id: number, data: { progress: number }) {
    const completedAt = data.progress >= 100 ? new Date() : undefined;

    return this.prisma.enrollment.update({
      where: { id },
      data: {
        progress: Math.min(data.progress, 100),
        completedAt,
      },
      include: {
        user: { select: { id: true, name: true } },
        course: { select: { id: true, title: true } },
      },
    });
  }

  // ── UNENROLL (delete) ──────────────────────────────────────────────
  // Demonstrates: Removing a record from the explicit M2M join table
  async unenroll(id: number) {
    return this.prisma.enrollment.delete({
      where: { id },
    });
  }
}

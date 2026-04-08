import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId?: number, courseId?: number) {
    return this.prisma.enrollment.findMany({
      where: {
        AND: [
          userId ? { userId } : {},
          courseId ? { courseId } : {},
        ],
      },
      include: {
        user: true,
        course: true,
      },
    });
  }

  async findOne(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }

    return enrollment;
  }

  async enroll(data: { userId: number; courseId: number }) {
    return this.prisma.enrollment.create({
      data: {
        user: { connect: { id: data.userId } },
        course: { connect: { id: data.courseId } },
      },
    });
  }

  async updateProgress(id: number, progress: number) {
    return this.prisma.enrollment.update({
      where: { id },
      data: {
        progress,
        // Optional: you can add logic for completedAt if progress is 100
      },
    });
  }

  async unenroll(id: number) {
    return this.prisma.enrollment.delete({
      where: { id },
    });
  }
}

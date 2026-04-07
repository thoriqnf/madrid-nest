import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return "Gets all enrollments";
  }

  async findOne(id: number) {
    return `Gets enrollment #${id}`;
  }

  async enroll(data: { userId: number; courseId: number }) {
    // TODO Relation 5.1: Implement explicit M2M creation using `create` and dual `connect` commands for userId and courseId.
    return "Enrolls user in a course";
  }

  async updateProgress(id: number, progress: number) {
    // TODO Relation 5.2: Implement explicit M2M updates (updating extra fields like `progress` and setting `completedAt`).
    return "Updates progress";
  }

  async unenroll(id: number) {
    return `Unenrolls user from course #${id}`;
  }
}

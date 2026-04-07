import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // TODO Relation 4.2: Use `_count` to fetch total enrollments for a course, alongside including the author.
    return "Returns all courses";
  }

  async findOne(id: number) {
    return `Returns course #${id} with its enrollments.`;
  }

  async create(data: {
    title: string;
    description?: string;
    published?: boolean;
    authorId: number;
    lessons?: { title: string; content?: string; order: number }[];
  }) {
    // TODO Relation 4.1: Update `create` to perform a nested `createMany` (lessons) and a nested `connect` (author).
    return "Creates a new course";
  }

  async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      published?: boolean;
    },
  ) {
    return "Updates course";
  }

  async remove(id: number) {
    return `Deletes course #${id}`;
  }
}

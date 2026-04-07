import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // TODO Relation 3.1: Update `findAll` to deeply include the user's `profile` and a count of their `courses`.
    return "Returns an array of users";
  }

  async findOne(id: number) {
    // TODO Relation 3.2: Update `findOne` to execute a deep include across 4 tables (Profile, Courses, Lessons, Enrollments).
    return `Returns user with ID #${id}`;
  }

  async create(data: {
    email: string;
    name: string;
    bio?: string;
    phone?: string;
  }) {
    // TODO Relation 3.3: Update `create` to perform a nested write for the user and profile simultaneously.
    return "Creates a new user and profile";
  }

  async update(
    id: number,
    data: { email?: string; name?: string; bio?: string; phone?: string },
  ) {
    // TODO Relation 3.4: Update `update` to perform an `upsert` on the nested profile (create if it doesn't exist, update if it does).
    return "Updates user and their profile";
  }

  async remove(id: number) {
    // TODO Relation 3.5: Delete user and verify Cascade deletes effectively wipe their profile, courses, and enrollments.
    return `Deletes user with ID #${id}`;
  }
}

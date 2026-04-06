import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ==========================================
  // TODO Prisma 5.1: Fetch all users
  // ==========================================
  // Return all users from the database. Use `include` to fetch their 1-to-1 profile!
  async findAll() {
    throw new NotImplementedException('TODO Prisma 5.1: Fetch all users including their profile');
  }

  // ==========================================
  // TODO Prisma 5.2: Fetch one user
  // ==========================================
  // Return a single user by ID including their profile.
  async findOne(id: number) {
    throw new NotImplementedException(`TODO Prisma 5.2: Fetch user ${id} and their profile`);
  }

  // ==========================================
  // TODO Prisma 5.3: Create a user
  // ==========================================
  // Create a user AND their nested profile simultaneously in one query.
  async create(data: { email: string; name: string; bio?: string; phone?: string }) {
    throw new NotImplementedException('TODO Prisma 5.3: Create user AND nested profile simultaneously');
  }

  // ==========================================
  // TODO Prisma 5.4: Update user & UPSERT profile
  // ==========================================
  // Update the user details. If bio/phone are provided, `upsert` the profile!
  async update(id: number, data: { name?: string; bio?: string; phone?: string }) {
    throw new NotImplementedException('TODO Prisma 5.4: Update user and UPSERT their profile');
  }

  // ==========================================
  // TODO Prisma 5.5: Delete user
  // ==========================================
  // Delete the user by ID. (Their profile should cascade delete).
  async remove(id: number) {
    throw new NotImplementedException(`TODO Prisma 5.5: Delete user ${id}`);
  }
}

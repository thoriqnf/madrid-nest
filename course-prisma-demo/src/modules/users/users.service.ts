import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Find all users and INCLUDE their 1-to-1 profile
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        profile: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  // Find one user by ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });
  }

  // Create user AND nested profile simultaneously
  async create(data: { email: string; name: string; bio?: string; phone?: string }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        // Nested create
        profile: (data.bio || data.phone)
          ? {
              create: { bio: data.bio, phone: data.phone },
            }
          : undefined,
      },
      include: { profile: true },
    });
  }

  // Update user and upsert profile
  async update(id: number, data: { name?: string; bio?: string; phone?: string }) {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        profile: (data.bio || data.phone)
          ? {
              upsert: {
                create: { bio: data.bio, phone: data.phone },
                update: { bio: data.bio, phone: data.phone },
              },
            }
          : undefined,
      },
      include: { profile: true },
    });
  }

  // Delete user (cascade automatically deletes profile)
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ── GET all users ──────────────────────────────────────────────────
  // Demonstrates: Multi-table JOIN (User → Profile + Courses + Enrollments.Course)
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        profile: true,
        courses: {
          include: {
            _count: { select: { lessons: true } },
          },
        },
        enrollments: {
          include: {
            course: { select: { id: true, title: true } },
          },
        },
      },
    });
  }

  // ── GET one user ───────────────────────────────────────────────────
  // Demonstrates: Deep include across 4+ tables
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        courses: {
          include: {
            lessons: { orderBy: { order: 'asc' } },
            categories: true,
            _count: { select: { enrollments: true } },
          },
        },
        enrollments: {
          include: {
            course: {
              include: {
                author: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  // ── CREATE user ────────────────────────────────────────────────────
  // Demonstrates: Nested write (create User + Profile in one transaction)
  async create(data: {
    email: string;
    name: string;
    bio?: string;
    phone?: string;
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        profile: {
          create: {
            bio: data.bio,
            phone: data.phone,
          },
        },
      },
      include: { profile: true },
    });
  }

  // ── UPDATE user ────────────────────────────────────────────────────
  // Demonstrates: Update + Upsert nested relation
  async update(
    id: number,
    data: { name?: string; bio?: string; phone?: string },
  ) {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        profile: {
          upsert: {
            create: { bio: data.bio, phone: data.phone },
            update: { bio: data.bio, phone: data.phone },
          },
        },
      },
      include: { profile: true },
    });
  }

  // ── DELETE user ────────────────────────────────────────────────────
  // Demonstrates: Cascade delete (Profile, Courses, Lessons, Enrollments all removed)
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

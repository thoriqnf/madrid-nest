import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    return this.prisma.user.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {},
      include: {
        profile: true,
        _count: {
          select: { courses: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        courses: {
          include: {
            _count: {
              select: { lessons: true },
            },
          },
        },
        enrollments: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(data: {
    email: string;
    name: string;
    bio?: string;
    phone?: string;
    password?: string; // Added password since it's required in schema, though usually handled by Auth
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password || 'password123', // Default for demo if not provided
        profile: {
          create: {
            bio: data.bio,
            phone: data.phone,
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async update(
    id: number,
    data: { email?: string; name?: string; bio?: string; phone?: string },
  ) {
    const { bio, phone, ...userData } = data;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        profile: {
          upsert: {
            create: { bio, phone },
            update: { bio, phone },
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findUnique({ email });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findUnique({ id });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.repository.create(data);
  }

  async updateHashedRefreshToken(userId: number, hashedRt: string | null): Promise<void> {
    await this.repository.update({
      where: { id: userId },
      data: { hashedRefreshToken: hashedRt },
    });
  }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TodosRepository } from '../repositories/todos.repository';
import { Todo, Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private repository: TodosRepository) {}

  async create(userId: number, title: string, description?: string): Promise<Todo> {
    return this.repository.create({
      title,
      description,
      user: { connect: { id: userId } },
    });
  }

  async findAll(userId: number): Promise<Todo[]> {
    return this.repository.findAll({ userId });
  }

  async findOne(userId: number, id: number): Promise<Todo> {
    const todo = await this.repository.findUnique({ id });
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    if (todo.userId !== userId) throw new ForbiddenException('Access Denied');
    return todo;
  }

  async update(userId: number, id: number, data: { title?: string; description?: string; completed?: boolean }): Promise<Todo> {
    await this.findOne(userId, id); // Check existence and ownership
    return this.repository.update({
      where: { id },
      data,
    });
  }

  async delete(userId: number, id: number): Promise<Todo> {
    await this.findOne(userId, id); // Check existence and ownership
    return this.repository.delete({ id });
  }
}

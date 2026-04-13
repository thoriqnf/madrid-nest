import { Module } from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { TodosController } from '../controllers/todos.controller';
import { TodosRepository } from '../repositories/todos.repository';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}

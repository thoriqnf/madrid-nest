import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { AtGuard } from '../guards';
import { GetCurrentUser } from '../decorators';

@UseGuards(AtGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @GetCurrentUser('sub') userId: number,
    @Body('title') title: string,
    @Body('description') description?: string,
  ) {
    return this.todosService.create(userId, title, description);
  }

  @Get()
  findAll(@GetCurrentUser('sub') userId: number) {
    return this.todosService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @GetCurrentUser('sub') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @GetCurrentUser('sub') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { title?: string; description?: string; completed?: boolean },
  ) {
    return this.todosService.update(userId, id, data);
  }

  @Delete(':id')
  remove(
    @GetCurrentUser('sub') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.delete(userId, id);
  }
}

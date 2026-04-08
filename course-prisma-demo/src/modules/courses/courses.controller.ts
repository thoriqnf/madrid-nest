import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Public()
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('published') published?: string,
  ) {
    const isPublished =
      published === 'true' ? true : published === 'false' ? false : undefined;
    return this.coursesService.findAll(search, isPublished);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(
    @Body()
    data: {
      title: string;
      description?: string;
      published?: boolean;
      authorId: number;
      lessons?: { title: string; content?: string; order: number }[];
    },
  ) {
    return this.coursesService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: {
      title?: string;
      description?: string;
      published?: boolean;
    },
  ) {
    return this.coursesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}

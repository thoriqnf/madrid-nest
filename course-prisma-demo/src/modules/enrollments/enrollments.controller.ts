import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.findOne(id);
  }

  @Post()
  enroll(@Body() data: { userId: number; courseId: number }) {
    return this.enrollmentsService.enroll(data);
  }

  @Patch(':id')
  updateProgress(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { progress: number },
  ) {
    return this.enrollmentsService.updateProgress(id, data);
  }

  @Delete(':id')
  unenroll(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.unenroll(id);
  }
}

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
import { Public } from '../../auth/decorators/public.decorator';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Public()
  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Public()
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
    return this.enrollmentsService.updateProgress(id, data.progress);
  }

  @Delete(':id')
  unenroll(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.unenroll(id);
  }
}

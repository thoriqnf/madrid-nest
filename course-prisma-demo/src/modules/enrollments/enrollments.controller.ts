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
import { EnrollmentsService } from './enrollments.service';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Public()
  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('courseId') courseId?: string,
  ) {
    return this.enrollmentsService.findAll(
      userId ? +userId : undefined,
      courseId ? +courseId : undefined,
    );
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

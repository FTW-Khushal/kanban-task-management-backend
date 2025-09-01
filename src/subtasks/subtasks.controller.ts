import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { Prisma } from '@prisma/client';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  create(@Body() createSubtaskDto: Prisma.subtasksCreateInput) {
    return this.subtasksService.create(createSubtaskDto);
  }

  @Get()
  findAll(@Query('taskId', ParseIntPipe) task_id: number) {
    return this.subtasksService.findAll(task_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtasksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubtaskDto: Prisma.subtasksUpdateInput,
  ) {
    return this.subtasksService.update(+id, updateSubtaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtasksService.remove(+id);
  }
}

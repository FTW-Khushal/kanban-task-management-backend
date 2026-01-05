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
import { TasksService } from './tasks.service';
import { tasks } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ReorderTaskDto } from './dto/reorder-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for a column' })
  findAll(@Query('columnId', ParseIntPipe) columnId: number) {
    return this.tasksService.findAll(columnId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch('reorder')
  @ApiOperation({ summary: 'Reorder a task' })
  reorder(@Body() reorderTaskDto: ReorderTaskDto) {
    return this.tasksService.reorder(
      reorderTaskDto.taskId,
      reorderTaskDto.targetColumnId,
      reorderTaskDto.prevTaskId,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}

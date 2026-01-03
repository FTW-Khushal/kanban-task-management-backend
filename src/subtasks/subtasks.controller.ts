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
import { subtasks } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@ApiTags('subtasks')
@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new subtask' })
  create(@Body() createSubtaskDto: CreateSubtaskDto) {
    return this.subtasksService.create(createSubtaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subtasks for a task' })
  findAll(@Query('taskId', ParseIntPipe) taskId: number) {
    return this.subtasksService.findAll(taskId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subtask by ID' })
  findOne(@Param('id') id: string) {
    return this.subtasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a subtask by ID' })
  update(
    @Param('id') id: string,
    @Body() updateSubtaskDto: UpdateSubtaskDto,
  ) {
    return this.subtasksService.update(+id, updateSubtaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subtask by ID' })
  remove(@Param('id') id: string) {
    return this.subtasksService.remove(+id);
  }
}

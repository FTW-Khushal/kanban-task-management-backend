import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createTaskDto: CreateTaskDto) {
    const { subtasks, ...taskData } = createTaskDto;
    return this.prismaService.tasks.create({
      data: {
        ...taskData,
        subtasks: {
          create: subtasks,
        },
      },
      include: {
        subtasks: true,
      },
    });
  }

  async reorder(taskId: number, targetColumnId: number, prevTaskId?: number) {
    let newPosition = 0;

    if (prevTaskId) {
      const prevTask = await this.prismaService.tasks.findUnique({
        where: { id: prevTaskId },
      });
      if (!prevTask) {
        throw new Error('Previous task not found');
      }

      const nextTask = await this.prismaService.tasks.findFirst({
        where: {
          column_id: targetColumnId,
          position: {
            gt: prevTask.position,
          },
        },
        orderBy: {
          position: 'asc',
        },
      });

      if (nextTask) {
        newPosition = (prevTask.position + nextTask.position) / 2;
      } else {
        newPosition = prevTask.position + 10000;
      }
    } else {
      const firstTask = await this.prismaService.tasks.findFirst({
        where: {
          column_id: targetColumnId,
        },
        orderBy: {
          position: 'asc',
        },
      });

      if (firstTask) {
        newPosition = firstTask.position / 2;
      } else {
        newPosition = 10000;
      }
    }

    return this.prismaService.tasks.update({
      where: { id: taskId },
      data: {
        column_id: targetColumnId,
        position: newPosition,
      },
    });
  }

  findAll(column_id: number) {
    return this.prismaService.tasks.findMany({
      where: {
        column_id,
      },
      orderBy: { position: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prismaService.tasks.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const { subtasks, ...data } = updateTaskDto;
    return this.prismaService.tasks.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prismaService.tasks.delete({
      where: { id },
    });
  }
}

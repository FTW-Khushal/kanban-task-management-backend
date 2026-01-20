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

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { subtasks, ...data } = updateTaskDto;

    // If no subtasks are provided, just update the task data
    if (!subtasks) {
      return this.prismaService.tasks.update({
        where: { id },
        data,
        include: { subtasks: true },
      });
    }

    return this.prismaService.$transaction(async (tx) => {
      // 1. Update the parent task
      await tx.tasks.update({
        where: { id },
        data,
      });

      // 2. Fetch existing subtasks to compare
      const existingSubtasks = await tx.subtasks.findMany({
        where: { task_id: id },
        select: { id: true },
      });
      const existingIds = existingSubtasks.map((s) => s.id);

      // 3. Identify subtasks to delete, create, and update
      // Incoming subtasks that have an ID are updates
      const incomingWithId = subtasks.filter((s) => s.id !== undefined && s.id !== null);
      const incomingIds = incomingWithId.map((s) => s.id!);

      // Delete: IDs in DB but not in payload
      const toDelete = existingIds.filter((eid) => !incomingIds.includes(eid));

      // Create: IDs not present in payload
      const toCreate = subtasks.filter((s) => !s.id);

      // Update: IDs present in both
      const toUpdate = incomingWithId;

      // 4. Execute Operations
      if (toDelete.length > 0) {
        await tx.subtasks.deleteMany({
          where: {
            id: { in: toDelete },
            task_id: id, // Security check: ensure we only delete subtasks of this task
          },
        });
      }

      for (const s of toCreate) {
        if (!s.title) continue; // Skip invalid new subtasks
        await tx.subtasks.create({
          data: {
            title: s.title,
            is_completed: s.is_completed ?? false,
            task_id: id,
          },
        });
      }

      for (const s of toUpdate) {
        await tx.subtasks.update({
          where: { id: s.id },
          data: {
            title: s.title,
            is_completed: s.is_completed,
          },
        });
      }

      // 5. Return full updated object
      return tx.tasks.findUnique({
        where: { id },
        include: { subtasks: true },
      });
    });
  }

  remove(id: number) {
    return this.prismaService.tasks.delete({
      where: { id },
    });
  }
}

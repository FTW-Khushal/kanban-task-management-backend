import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createTaskDto: Prisma.tasksUncheckedCreateInput) {
    return this.prismaService.tasks.create({
      data: createTaskDto,
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

  update(id: number, updateTaskDto: Prisma.tasksUpdateInput) {
    return this.prismaService.tasks.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prismaService.tasks.delete({
      where: { id },
    });
  }
}

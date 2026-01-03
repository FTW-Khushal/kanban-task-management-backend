import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SubtasksService {
  constructor(private readonly prismaService: PrismaService) { }
  create(createSubtaskDto: Prisma.subtasksUncheckedCreateInput) {
    return this.prismaService.subtasks.create({
      data: createSubtaskDto,
    });
  }

  findAll(task_id: number) {
    return this.prismaService.subtasks.findMany({
      where: {
        task_id,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.subtasks.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateSubtaskDto: Prisma.subtasksUpdateInput) {
    return this.prismaService.subtasks.update({
      where: { id },
      data: updateSubtaskDto,
    });
  }

  remove(id: number) {
    return this.prismaService.subtasks.delete({
      where: { id },
    });
  }
}

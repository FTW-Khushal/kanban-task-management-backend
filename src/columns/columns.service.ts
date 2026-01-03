import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ColumnsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createColumn: Prisma.columnsUncheckedCreateInput) {
    return this.prismaService.columns.create({
      data: createColumn,
    });
  }

  findAll(boardId: number) {
    return this.prismaService.columns.findMany({
      where: {
        board_id: boardId,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.columns.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateColumnDto: Prisma.columnsUpdateInput) {
    return this.prismaService.columns.update({
      where: { id },
      data: updateColumnDto,
    });
  }

  remove(id: number) {
    return this.prismaService.columns.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, boards } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBoards(): Promise<boards[]> {
    return this.prisma.boards.findMany();
  }

  async createBoard(board: Prisma.boardsCreateInput): Promise<boards> {
    return this.prisma.boards.create({ data: board });
  }

  async updateBoard(
    id: number,
    data: Prisma.boardsUpdateInput,
  ): Promise<boards> {
    console.log('Updating board with I:', id);
    return this.prisma.boards.update({
      where: { id },
      data: data,
    });
  }

  async deleteBoard(id: number): Promise<boards> {
    return this.prisma.boards.delete({
      where: { id },
    });
  }
}

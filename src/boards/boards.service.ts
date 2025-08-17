import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { boards } from 'generated/prisma';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBoards(): Promise<boards[]> {
    return this.prisma.boards.findMany();
  }
}

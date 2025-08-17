import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { boards } from 'generated/prisma';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getAllBoards(): Promise<boards[]> {
    return this.boardsService.getAllBoards();
  }
}

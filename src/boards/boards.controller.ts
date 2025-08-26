import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { boards, Prisma } from '@prisma/client';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getAllBoards(): Promise<boards[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  async createBoard(@Body() board: Prisma.boardsCreateInput): Promise<boards> {
    return this.boardsService.createBoard(board);
  }

  @Patch(':id')
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.boardsUpdateInput,
  ): Promise<boards> {
    console.log('Controller: Updating board with ID:', id);
    return this.boardsService.updateBoard(id, data);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string): Promise<boards> {
    return this.boardsService.deleteBoard(Number(id));
  }
}

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
import { boards } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all boards' })
  async getAllBoards(): Promise<boards[]> {
    return this.boardsService.getAllBoards();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a board by ID with all relations' })
  async getBoard(@Param('id', ParseIntPipe) id: number): Promise<boards | null> {
    return this.boardsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new board' })
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<boards> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a board by ID' })
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<boards> {
    console.log('Controller: Updating board with ID:', id);
    return this.boardsService.updateBoard(id, updateBoardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a board by ID' })
  async deleteBoard(@Param('id') id: string): Promise<boards> {
    return this.boardsService.deleteBoard(Number(id));
  }
}

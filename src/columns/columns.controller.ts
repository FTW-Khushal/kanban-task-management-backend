import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { Prisma } from '@prisma/client';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Body() createColumnDto: Prisma.columnsCreateInput) {
    return this.columnsService.create(createColumnDto);
  }

  @Get()
  findAll(@Query('boardId', ParseIntPipe) boardId: number) {
    return this.columnsService.findAll(boardId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColumnDto: Prisma.columnsUpdateInput,
  ) {
    return this.columnsService.update(+id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(+id);
  }
}

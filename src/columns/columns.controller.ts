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
import { columns } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new column' })
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all columns for a board' })
  findAll(@Query('boardId', ParseIntPipe) boardId: number) {
    return this.columnsService.findAll(boardId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a column by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a column by ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(+id, updateColumnDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a column by ID' })
  remove(@Param('id') id: string) {
    return this.columnsService.remove(+id);
  }
}

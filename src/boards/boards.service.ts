import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, boards } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) { }

  async getAllBoards(): Promise<boards[]> {
    return this.prisma.boards.findMany({
      orderBy: { id: 'asc' }
    });
  }

  async findOne(id: number): Promise<boards | null> {
    return this.prisma.boards.findUnique({
      where: { id },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: {
                  orderBy: { id: 'asc' }
                }
              },
              orderBy: { position: 'asc' }
            }
          },
          orderBy: { id: 'asc' }
        }
      }
    });
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<boards> {
    const { columns, ...boardData } = createBoardDto;
    return this.prisma.boards.create({
      data: {
        ...boardData,
        columns: {
          create: columns?.map(col => ({ name: col.name })),
        },
      },
      include: {
        columns: true,
      },
    });
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<boards> {
    const { columns, ...data } = updateBoardDto;

    if (!columns) {
      return this.prisma.boards.update({
        where: { id },
        data: data,
        include: { columns: true },
      });
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Update the parent board
      await tx.boards.update({
        where: { id },
        data,
      });

      // 2. Fetch existing columns to compare
      const existingColumns = await tx.columns.findMany({
        where: { board_id: id },
        select: { id: true },
      });
      const existingIds = existingColumns.map((c) => c.id);

      // 3. Identify columns to delete, create, and update
      const incomingWithId = columns.filter((c) => c.id !== undefined && c.id !== null);
      const incomingIds = incomingWithId.map((c) => c.id!);

      const toDelete = existingIds.filter((eid) => !incomingIds.includes(eid));
      const toCreate = columns.filter((c) => !c.id);
      const toUpdate = incomingWithId;

      // 4. Execute Operations
      if (toDelete.length > 0) {
        await tx.columns.deleteMany({
          where: {
            id: { in: toDelete },
            board_id: id,
          },
        });
      }

      for (const column of toCreate) {
        if (!column.name) continue;
        await tx.columns.create({
          data: {
            name: column.name,
            board_id: id,
          },
        });
      }

      for (const column of toUpdate) {
        await tx.columns.update({
          where: { id: column.id },
          data: {
            name: column.name,
          },
        });
      }

      // 5. Return full updated object
      return tx.boards.findUnique({
        where: { id },
        include: {
          columns: {
            include: {
              tasks: {
                include: {
                  subtasks: {
                    orderBy: { id: 'asc' }
                  }
                },
                orderBy: { position: 'asc' }
              }
            },
            orderBy: { id: 'asc' }
          }
        },
      });
    }) as Promise<boards>;
  }

  async deleteBoard(id: number): Promise<boards> {
    return this.prisma.boards.delete({
      where: { id },
    });
  }
}

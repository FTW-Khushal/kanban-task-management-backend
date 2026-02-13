
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseResetService {
    private readonly logger = new Logger(DatabaseResetService.name);
    private readonly seedDataPath = path.join(__dirname, '..', 'data', 'seed-data.json');

    constructor(private readonly prisma: PrismaService) { }

    async createSnapshot() {
        this.logger.log('Creating database snapshot...');
        const boards = await this.prisma.boards.findMany({
            include: {
                columns: {
                    include: {
                        tasks: {
                            include: {
                                subtasks: true,
                            },
                        },
                    },
                },
            },
        });

        // Clean data to remove IDs and timestamps for a clean seed file
        const cleanData = {
            boards: boards.map((board) => ({
                name: board.name,
                columns: board.columns.map((column) => ({
                    name: column.name,
                    tasks: column.tasks.map((task) => ({
                        title: task.title,
                        description: task.description,
                        status: column.name, // Assuming status maps to column name
                        position: task.position,
                        subtasks: task.subtasks.map((subtask) => ({
                            title: subtask.title,
                            isCompleted: subtask.is_completed,
                        })),
                    })),
                })),
            })),
        };

        fs.writeFileSync(this.seedDataPath, JSON.stringify(cleanData, null, 2));
        this.logger.log(`Snapshot saved to ${this.seedDataPath}`);
        return { message: 'Snapshot created successfully' };
    }

    async resetDatabase() {
        this.logger.log('Resetting database...');

        if (!fs.existsSync(this.seedDataPath)) {
            throw new Error('Seed data file not found');
        }

        const seedDataRaw = fs.readFileSync(this.seedDataPath, 'utf-8');
        const seedData = JSON.parse(seedDataRaw);

        await this.prisma.$transaction(async (tx) => {
            // Delete all boards (Cascades to columns, tasks, subtasks)
            await tx.boards.deleteMany({});

            // Re-create data
            for (const boardData of seedData.boards) {
                await tx.boards.create({
                    data: {
                        name: boardData.name,
                        columns: {
                            create: boardData.columns.map((column: any) => ({
                                name: column.name,
                                tasks: {
                                    create: column.tasks.map((task: any) => ({
                                        title: task.title,
                                        description: task.description,
                                        position: task.position ?? 0, // Default position if missing
                                        subtasks: {
                                            create: task.subtasks.map((subtask: any) => ({
                                                title: subtask.title,
                                                is_completed: subtask.isCompleted ?? subtask.is_completed ?? false,
                                            })),
                                        },
                                    })),
                                },
                            })),
                        },
                    },
                });
            }
        });

        this.logger.log('Database reset complete.');
        return { message: 'Database reset successfully' };
    }
}

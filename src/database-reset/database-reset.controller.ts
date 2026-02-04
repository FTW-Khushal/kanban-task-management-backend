
import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { DatabaseResetService } from './database-reset.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Database Reset')
@Controller('database')
export class DatabaseResetController {
    constructor(private readonly databaseResetService: DatabaseResetService) { }

    @Post('snapshot')
    @ApiOperation({ summary: 'Create a snapshot of the current database state' })
    @ApiResponse({ status: 200, description: 'Snapshot created successfully.' })
    @HttpCode(HttpStatus.OK)
    async createSnapshot() {
        return this.databaseResetService.createSnapshot();
    }

    @Post('reset')
    @ApiOperation({ summary: 'Reset the database to the saved snapshot' })
    @ApiResponse({ status: 200, description: 'Database reset successfully.' })
    @HttpCode(HttpStatus.OK)
    async resetDatabase() {
        return this.databaseResetService.resetDatabase();
    }
}


import { Module } from '@nestjs/common';
import { DatabaseResetController } from './database-reset.controller';
import { DatabaseResetService } from './database-reset.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [DatabaseResetController],
    providers: [DatabaseResetService],
})
export class DatabaseResetModule { }

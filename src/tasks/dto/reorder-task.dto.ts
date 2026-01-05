import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ReorderTaskDto {
    @ApiProperty({ description: 'The ID of the task to reorder', example: 1 })
    @IsInt()
    @IsNotEmpty()
    taskId: number;

    @ApiProperty({ description: 'The ID of the target column', example: 2 })
    @IsInt()
    @IsNotEmpty()
    targetColumnId: number;

    @ApiPropertyOptional({ description: 'The ID of the task immediately before the new position', example: 1 })
    @IsInt()
    @IsOptional()
    prevTaskId?: number;
}

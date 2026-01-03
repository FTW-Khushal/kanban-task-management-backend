import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubtaskDto {
    @ApiProperty({ description: 'The title of the subtask', example: 'Review design mockups' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ description: 'Whether the subtask is completed', default: false, example: false })
    @IsBoolean()
    @IsOptional()
    is_completed?: boolean;

    @ApiProperty({ description: 'The ID of the task this subtask belongs to', example: 1 })
    @IsInt()
    @IsNotEmpty()
    task_id: number;
}

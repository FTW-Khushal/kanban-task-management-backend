import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({ description: 'The title of the task', example: 'Design Homepage' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ description: 'The description of the task', example: 'Create a responsive design for the homepage.' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'The position of the task in the column', example: 0 })
    @IsInt()
    @IsNotEmpty()
    position: number;

    @ApiProperty({ description: 'The ID of the column this task belongs to', example: 1 })
    @IsInt()
    @IsNotEmpty()
    column_id: number;
}

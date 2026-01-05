import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsBoolean } from 'class-validator';

export class CreateNestedSubtaskDto {
    @ApiProperty({ description: 'The title of the subtask', example: 'Review design mockups' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ description: 'Whether the subtask is completed', default: false, example: false })
    @IsBoolean()
    @IsOptional()
    is_completed?: boolean;
}

export class CreateTaskDto {
    @ApiProperty({ description: 'The title of the task', example: 'Design Homepage' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ description: 'The description of the task', example: 'Create a responsive design for the homepage.' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'The position of the task in the column', example: 1000.5 })
    @IsNumber()
    @IsNotEmpty()
    position: number;

    @ApiProperty({ description: 'The ID of the column this task belongs to', example: 1 })
    @IsInt()
    @IsNotEmpty()
    column_id: number;

    @ApiPropertyOptional({ type: [CreateNestedSubtaskDto], description: 'List of subtasks' })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateNestedSubtaskDto)
    subtasks?: CreateNestedSubtaskDto[];
}

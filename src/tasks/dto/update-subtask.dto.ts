import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { CreateNestedSubtaskDto } from './create-task.dto';

export class UpdateNestedSubtaskDto extends PartialType(CreateNestedSubtaskDto) {
    @ApiPropertyOptional({ description: 'The ID of the subtask (if updating existing)' })
    @IsOptional()
    @IsInt()
    id?: number;
}

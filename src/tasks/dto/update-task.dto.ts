import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional, PartialType, OmitType } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateNestedSubtaskDto } from './update-subtask.dto';

class CreateTaskDtoWithoutSubtasks extends OmitType(CreateTaskDto, ['subtasks'] as const) { }

export class UpdateTaskDto extends PartialType(CreateTaskDtoWithoutSubtasks) {
    @ApiPropertyOptional({ type: [UpdateNestedSubtaskDto], description: 'List of subtasks to update, create, or keep' })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateNestedSubtaskDto)
    subtasks?: UpdateNestedSubtaskDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class BoardColumnDto {
    @ApiProperty({ description: 'The ID of the column (optional for existing columns)', example: 1, required: false })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ description: 'The name of the column', example: 'To Do' })
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class CreateBoardDto {
    @ApiProperty({ description: 'The name of the board', example: 'Product Roadmap' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The columns of the board', type: [BoardColumnDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BoardColumnDto)
    columns?: BoardColumnDto[];
}

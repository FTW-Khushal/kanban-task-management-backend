import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
    @ApiProperty({ description: 'The name of the column', example: 'To Do' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The ID of the board this column belongs to', example: 1 })
    @IsInt()
    @IsNotEmpty()
    board_id: number;
}

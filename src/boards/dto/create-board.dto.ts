import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
    @ApiProperty({ description: 'The name of the board', example: 'Product Roadmap' })
    @IsString()
    @IsNotEmpty()
    name: string;
}

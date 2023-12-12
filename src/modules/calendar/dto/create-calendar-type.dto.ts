import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDate, IsString, IsNotEmpty } from 'class-validator';

export class CreateCalendarTypeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    status?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsString, IsNotEmpty } from 'class-validator';

export class CreateCalendarDto {
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    start_date: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    end_date?: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    notice?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    type?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    color?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    status?: string;
}

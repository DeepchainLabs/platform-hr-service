import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateWorkingDaysDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    from?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    to?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    created_by?: number;
}

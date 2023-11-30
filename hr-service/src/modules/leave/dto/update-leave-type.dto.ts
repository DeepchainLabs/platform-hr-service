import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateLeaveTypeDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    num_of_days_allowed?: number;

    // @IsString()
    // @IsOptional()
    // status?: string;
}

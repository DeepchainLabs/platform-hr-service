import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLeaveDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    applied_for?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    reason?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    request_date?: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    start_date?: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    end_date?: Date;

    @ApiProperty()
    @IsOptional()
    num_of_working_days?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    leave_type_id?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    updated_by?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    approved_by?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    remarks?: string;
}

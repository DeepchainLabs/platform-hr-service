import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateLeaveInfoDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    user_id?: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    start_date?: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    end_date?: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLeaveInfoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id: string;

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
}

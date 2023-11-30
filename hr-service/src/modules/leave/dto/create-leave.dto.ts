import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsOptional,
  IsDate,
  IsString,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class CreateLeaveDto {
  constructor() {
    this.applied_for = "";
    this.applied_by = "";
    this.num_of_working_days = 0;
  }
  @ApiProperty()
  @IsString()
  @IsOptional()
  applied_for?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  applied_by?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  request_date?: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  num_of_working_days?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  leave_type_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status?: string;
}

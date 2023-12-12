import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
} from "class-validator";

export class CreateLeaveTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  num_of_days_allowed: number;
}

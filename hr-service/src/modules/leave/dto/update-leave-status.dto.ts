import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LeaveStatus } from "src/common/enums/leave-status.enum";

export class UpdateLeaveStatusDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  approved_by?: string;

  @ApiProperty()
  @IsEnum(LeaveStatus)
  @IsNotEmpty()
  status: LeaveStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updated_at?: any;
}

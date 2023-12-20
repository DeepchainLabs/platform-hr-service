import { IsOptional, IsString, IsNotEmpty } from "class-validator";

export class CreateLeaveAttachmentDto {
  @IsString()
  @IsNotEmpty()
  application_id: string;

  @IsString()
  @IsOptional()
  display_name?: string;

  @IsString()
  @IsNotEmpty()
  file_path: string;

  @IsOptional()
  size?: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  storage_type?: string;
}

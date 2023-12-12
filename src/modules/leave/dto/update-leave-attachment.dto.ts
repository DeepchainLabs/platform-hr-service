import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateLeaveAttachmentDto {
    @IsString()
    @IsOptional()
    application_id?: string;

    @IsString()
    @IsOptional()
    display_name?: string;

    @IsString()
    @IsOptional()
    file_path?: string;
}
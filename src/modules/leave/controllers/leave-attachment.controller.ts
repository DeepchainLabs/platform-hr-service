import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { CreateLeaveAttachmentDto } from "../dto";
import { UpdateWorkingDaysDto } from "../dto/update-working-days.dto";
import { LeaveAttachmentService } from "../services/leave-attachment.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller("")
export class LeaveAttachmentsController {
  constructor(private workingDaysService: LeaveAttachmentService) {}

  /**
   * TODO Done
   */
  @MessagePattern("CREATE_LEAVE_ATTACHMENTS")
  @ApiBody({ type: UpdateWorkingDaysDto })
  createOne({ body }: { body: CreateLeaveAttachmentDto }) {
    return this.workingDaysService.createOne(body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("DELETE_LEAVE_ATTACHMENTS")
  @ApiBody({ type: UpdateWorkingDaysDto })
  async patchOne({ id }: { id: string }) {
    return await this.workingDaysService.deleteOne(id);
  }
}

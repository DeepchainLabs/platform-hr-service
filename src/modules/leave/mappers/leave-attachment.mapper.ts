import { LeaveAttachment } from '../entities/leave-attachment.entity';
import { ILeaveAttachment } from '../interfaces/leave-attachment.interface';
import { LeaveAttachmentModel } from '../models/leave-attachment.model';

class LeaveAttachmentMapper {
    mapMany(attachments: LeaveAttachment[]): ILeaveAttachment[] {
        const list: ILeaveAttachment[] = [];
        attachments.forEach((attachment) =>
            list.push(
                attachment ? new LeaveAttachmentModel(attachment) : attachment
            )
        );

        return list;
    }
    mapOne(attachment: LeaveAttachment): ILeaveAttachment {
        return attachment ? new LeaveAttachmentModel(attachment) : attachment;
    }
}

const LeaveAttachmentMapperInstance = new LeaveAttachmentMapper();
export { LeaveAttachmentMapperInstance };

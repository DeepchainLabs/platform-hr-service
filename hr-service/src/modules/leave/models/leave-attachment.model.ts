import { ILeaveAttachment } from "../interfaces/leave-attachment.interface";

export class LeaveAttachmentModel {
    constructor(options: ILeaveAttachment) {
        Object.assign(this, options);
    }
}
import { ILeaveApplication } from '../interfaces/leave-application.interface';

export class LeaveApplicationModel {
    constructor(options: ILeaveApplication) {
        Object.assign(this, options);
    }
}

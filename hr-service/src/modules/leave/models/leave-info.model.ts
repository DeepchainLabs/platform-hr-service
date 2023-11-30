import { ILeaveInfo } from '../interfaces/leave-info.interface';

export class LeaveInfoModel {
    constructor(options: ILeaveInfo) {
        Object.assign(this, options);
    }
}
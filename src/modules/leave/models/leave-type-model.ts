import { ILeaveType } from "../interfaces/leave-type.interface";

export class LeaveTypeModel {
  constructor(options: ILeaveType) {
    Object.assign(this, options);
  }
}

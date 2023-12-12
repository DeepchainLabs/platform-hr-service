import { LeaveApplication } from '../entities/leave-application.entity';
import { ILeaveApplication } from '../interfaces/leave-application.interface';
import { LeaveApplicationModel } from '../models/leave-application.model';

class LeaveApplicationMapper {
    // constructor() { }
    mapMany(leaveApplications: LeaveApplication[]): ILeaveApplication[] {
        const list: ILeaveApplication[] = [];
        leaveApplications.forEach((leaveApplication) =>
            list.push(
                leaveApplication
                    ? new LeaveApplicationModel(leaveApplication)
                    : leaveApplication
            )
        );
        return list;
    }

    mapOne(leaveApplication: LeaveApplication): ILeaveApplication {
        return leaveApplication
            ? new LeaveApplicationModel(leaveApplication)
            : leaveApplication;
    }
}

const LeaveApplicationMapperInstance = new LeaveApplicationMapper();
export { LeaveApplicationMapperInstance };

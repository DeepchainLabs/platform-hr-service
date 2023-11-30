import { LeaveInfo } from '../entities/session-info.entity';
import { ILeaveInfo } from '../interfaces/leave-info.interface';
import { LeaveInfoModel } from '../models/leave-info.model';

class LeaveInfoMapper {
    // constructor() { }
    mapMany(leaveInfos: LeaveInfo[]): ILeaveInfo[] {
        const list: ILeaveInfo[] = [];
        leaveInfos.forEach((leaveInfo) =>
            list.push(leaveInfo ? new LeaveInfoModel(leaveInfo) : leaveInfo)
        );
        return list;
    }

    mapOne(leaveInfo: LeaveInfo): ILeaveInfo {
        return leaveInfo ? new LeaveInfoModel(leaveInfo) : leaveInfo;
    }
}

const LeaveInfoMapperInstance = new LeaveInfoMapper();
export { LeaveInfoMapperInstance };

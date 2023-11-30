import { LeaveType } from '../entities/leave-type.entity';
import { ILeaveType } from '../interfaces/leave-type.interface';
import { LeaveTypeModel } from '../models/leave-type-model';
class LeaveTypeMapper {
    mapMany(types: LeaveType[]): ILeaveType[] {
        const list: ILeaveType[] = [];
        types.forEach((type) =>
            list.push(type ? new LeaveTypeModel(type) : type)
        );

        return list;
    }
    mapOne(type: LeaveType): ILeaveType {
        return type ? new LeaveTypeModel(type) : type;
    }
}

const LeaveTypeMapperInstance = new LeaveTypeMapper();
export { LeaveTypeMapperInstance };

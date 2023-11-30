import { CreateLeaveDto } from "../dto/create-leave.dto";
import { UpdateLeaveDto } from "../dto/update-leave.dto";


export abstract class ILeaveService {
    findAll(findOptions: any, page: number, limit: number) { }
    findOneById(id: string) { }
    getLeave(id: string) { }
    createOne(dto: CreateLeaveDto) { }
    patchOne(id: string, dto: UpdateLeaveDto) { }
    deleteOne(id: string) { }
}
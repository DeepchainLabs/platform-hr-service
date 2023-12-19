import { Controller } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from "../dto";
import { LeaveTypeService } from "../services/leave-type.service";
import { paginateResponse } from "src/common/helpers/paginate-response";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { MessagePattern } from "@nestjs/microservices";

@ApiTags("LeaveType")
@Controller("")
export class LeaveTypeController {
  constructor(private leaveTypeService: LeaveTypeService) {}

  /**
   * TODO Done
   */
  @MessagePattern("GET_ALL_LEAVE_APPLICATION_TYPE_WITH_PAGINATION")
  async findAll({
    findOptions,
    page,
    limit,
  }: {
    findOptions: any;
    page: number;
    limit: number;
  }) {
    const data = await this.leaveTypeService.findAllWithPagination(
      findOptions,
      page,
      limit,
    );
    return paginateResponse(data, page, limit);
  }
  /**
   * TODO Done
   */
  @MessagePattern(
    "GET_ALL_LEAVE_APPLICATION_TYPE_WITH_PAGINATION_ACTIVE_INACTIVE",
  )
  async findAllActiveAndInactive({
    findOptions,
    page,
    limit,
  }: {
    findOptions: any;
    page: number;
    limit: number;
  }) {
    const data = await this.leaveTypeService.findAllActiveAndInactive(
      findOptions,
      page,
      limit,
    );
    return paginateResponse(data, page, limit);
  }

  /**
   * TODO Done
   */
  @MessagePattern("GET_ONE_LEAVE_APPLICATION_TYPE")
  findOne({
    findOptions,
    id,
  }: {
    findOptions: any;
    id: string;
  }): Promise<IReturnType> {
    return this.leaveTypeService.findOne(findOptions, id);
  }

  /**
   * TODO Done
   */
  @MessagePattern("CREATE_ONE_LEAVE_APPLICATION_TYPE")
  @ApiBody({ type: CreateLeaveTypeDto })
  createOne({ body }: { body: CreateLeaveTypeDto }) {
    return this.leaveTypeService.createOne(body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("UPDATE_ONE_LEAVE_APPLICATION_TYPE")
  @ApiBody({ type: UpdateLeaveTypeDto })
  patchOne({
    id,
    body,
  }: {
    id: string;
    body: CreateLeaveTypeDto;
  }): Promise<IReturnType> {
    return this.leaveTypeService.patchOne(id, body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("DELETE_ONE_LEAVE_APPLICATION_TYPE")
  delete({ id }: { id: string }) {
    return this.leaveTypeService.deleteOne(id);
  }
}

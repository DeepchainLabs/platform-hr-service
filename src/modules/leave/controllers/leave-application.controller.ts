import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { UpdateLeaveStatusDto } from "../dto";
import { CreateLeaveDto } from "../dto/create-leave.dto";
import { UpdateLeaveDto } from "../dto/update-leave.dto";
import { LeaveApplicationService } from "../services/leave-application.service";
import { paginateResponse } from "src/common/helpers/paginate-response";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { MessagePattern } from "@nestjs/microservices";

@ApiTags("LeaveApplication")
@Controller("leave-application")
@ApiBearerAuth("access-token")
@ApiHeader({ name: "x-tenant", description: "Tenant ID" })
export class LeaveApplicationController {
  constructor(private readonly leaveService: LeaveApplicationService) {}

  /**
   * TODO Done
   */
  @MessagePattern("FIND_ALL_LEAVE_APPLICATION")
  async findAll({
    findOptions,
    page,
    limit,
  }: {
    findOptions: any;
    page: number;
    limit: number;
  }) {
    const data = await this.leaveService.findAllWithPagination(
      findOptions,
      page,
      limit,
    );
    return paginateResponse(data, page, limit);
  }

  /**
   * TODO Done
   */
  @MessagePattern("TOTAL_REMAINING_LEAVE_BY_USER_ID_SESSION_ID")
  getAllRemainingLeaves({
    userId,
    sessionId,
  }: {
    userId: string;
    sessionId: string;
  }) {
    return this.leaveService.getAllRemainingLeaves(userId, sessionId);
  }

  /**
   * TODO Done
   */
  @MessagePattern("FIND_ONE_APPLICATION_BY_ID")
  findOne({
    findOptions,
    id,
  }: {
    findOptions: any;
    id: string;
  }): Promise<IReturnType> {
    return this.leaveService.findOne(findOptions, id);
  }

  /**
   * TODO Done
   */
  @ApiBody({ type: CreateLeaveDto })
  @MessagePattern("CREATE_ONE_APPLICATION")
  createOne({ body, user_id }: { body: CreateLeaveDto; user_id: string }) {
    body.applied_for = body.applied_for || user_id;
    body.applied_by = user_id;
    console.log({ body });
    return this.leaveService.createOne(body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("UPDATE_ONE_APPLICATION")
  @ApiBody({ type: UpdateLeaveDto })
  async patchOne({
    id,
    body,
    user_id,
  }: {
    id: string;
    body: UpdateLeaveDto;
    user_id: string;
  }): Promise<IReturnType> {
    // body.applied_for = body.applied_for || user_id;
    body.updated_by = user_id;
    body.approved_by = user_id;
    return await this.leaveService.patchOne(id, body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("UPDATE_ONE_APPLICATION_STATUS")
  @ApiBody({ type: UpdateLeaveStatusDto })
  changeStatus({
    id,
    body,
    user_id,
  }: {
    id: string;
    body: UpdateLeaveStatusDto;
    user_id: string;
  }): Promise<IReturnType> {
    body.approved_by = user_id;
    body.updated_at = new Date();
    return this.leaveService.updateStatus(id, body, user_id);
  }

  /**
   * TODO Done
   */
  @MessagePattern("DELETE_ONE_APPLICATION_STATUS")
  delete({ id }: { id: string }) {
    return this.leaveService.deleteOne(id);
  }
}

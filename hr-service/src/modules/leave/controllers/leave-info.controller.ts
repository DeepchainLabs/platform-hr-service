import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { CreateLeaveInfoDto, UpdateLeaveInfoDto } from "../dto";
import { LeaveInfoService } from "../services/leave-info.service";
import { QueryParserPipe } from "src/common/pipes/queryParser.pipe";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

@ApiTags("LeaveInfo")
@Controller("leave-application/info")
export class LeaveInfoController {
  constructor(private readonly leaveService: LeaveInfoService) {}

  /**
   * TODO Done
   */
  @MessagePattern("FIND_ALL_LEAVE_APPLICATION_INFO")
  findAll({
    findOptions,
    page,
    limit,
  }: {
    findOptions: any;
    page: number;
    limit: number;
  }) {
    return this.leaveService.findAllWithPagination(findOptions, page, limit);
  }

  /**
   * TODO Done
   */
  @MessagePattern("FIND_ALL_LEAVE_APPLICATION_INFO_BY_USER")
  findAllByUserId({ user_id }: { user_id: string }) {
    return this.leaveService.findByUserId(user_id);
  }

  /**
   * TODO Done
   */
  @MessagePattern("FIND_ONE_LEAVE_APPLICATION_INFO_BY_ID")
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
  @MessagePattern("FIND_ONE_SESSION_BY_USER_ID")
  findOneUserSession({ user_id, id }: { user_id: string; id: string }) {
    return this.leaveService.getLatestInfo(user_id, id);
  }

  /**
   * TODO Done
   */
  @EventPattern("CREATE_ONE_LEAVE_SESSION")
  @ApiBody({ type: CreateLeaveInfoDto })
  createOne({ body }: { body: CreateLeaveInfoDto }) {
    return this.leaveService.createOne(body);
  }

  // /**
  //  * TODO Done
  //  */
  // @EventPattern("UPDATE_ONE_LEAVE_SESSION")
  // @ApiBody({ type: UpdateLeaveInfoDto })
  // patchOne({
  //   id,
  //   body,
  // }: {
  //   id: string;
  //   body: UpdateLeaveInfoDto;
  // }): Promise<IReturnType> {
  //   return this.leaveService.patchOne(id, body);
  // }

  /**
   * TODO Done
   */
  @EventPattern("DELETE_ONE_LEAVE_SESSION")
  delete({ id }: { id: string }) {
    return this.leaveService.deleteOne(id);
  }
}

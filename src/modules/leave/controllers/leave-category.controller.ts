import { ApiBody, ApiTags } from "@nestjs/swagger";

import { paginateResponse } from "src/common/helpers/paginate-response";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { MessagePattern } from "@nestjs/microservices";
import { LeaveCategoryService } from "../services/leave-category.service";
import { Controller } from "@nestjs/common";
import { CreateLeaveCategoryDto } from "../dto/create-leave-category.dto";
import { UpdateLeaveCategoryDto } from "../dto/update-leave-category.dto";

@ApiTags("LeaveType")
@Controller("")
export class LeaveCategoryController {
  constructor(private leaveCategoryService: LeaveCategoryService) {}

  /**
   * TODO Done
   */
  @MessagePattern("GET_ALL_LEAVE_APPLICATION_CATEGORY_WITH_PAGINATION")
  async findAll({
    findOptions,
    page,
    limit,
  }: {
    findOptions: any;
    page: number;
    limit: number;
  }) {
    const data = await this.leaveCategoryService.findAllWithPagination(
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
    "GET_ALL_LEAVE_APPLICATION_CATEGORY_WITH_PAGINATION_ACTIVE_INACTIVE",
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
    const data = await this.leaveCategoryService.findAllActiveAndInactive(
      findOptions,
      page,
      limit,
    );
    return paginateResponse(data, page, limit);
  }

  /**
   * TODO Done
   */
  @MessagePattern("GET_ONE_LEAVE_APPLICATION_CATEGORY")
  findOne({
    findOptions,
    id,
  }: {
    findOptions: any;
    id: string;
  }): Promise<IReturnType> {
    return this.leaveCategoryService.findOne(findOptions, id);
  }

  /**
   * TODO Done
   */
  @MessagePattern("CREATE_ONE_LEAVE_APPLICATION_CATEGORY")
  @ApiBody({ type: CreateLeaveCategoryDto })
  createOne({ body }: { body: CreateLeaveCategoryDto }) {
    return this.leaveCategoryService.createOne(body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("UPDATE_ONE_LEAVE_APPLICATION_CATEGORY")
  @ApiBody({ type: UpdateLeaveCategoryDto })
  patchOne({
    id,
    body,
  }: {
    id: string;
    body: CreateLeaveCategoryDto;
  }): Promise<IReturnType> {
    return this.leaveCategoryService.patchOne(id, body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("DELETE_ONE_LEAVE_APPLICATION_CATEGORY")
  delete({ id }: { id: string }) {
    return this.leaveCategoryService.deleteOne(id);
  }
}

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
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from "../dto";
import { WorkingDaysService } from "../services/working-days.service";
import { UpdateWorkingDaysDto } from "../dto/update-working-days.dto";
import { QueryParserPipe } from "src/common/pipes/queryParser.pipe";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { WorkingDays } from "../entities/working-days.entity";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

@Controller("")
export class WorkingDaysController {
  constructor(private workingDaysService: WorkingDaysService) {}

  /**
   * TODO Done
   */
  @MessagePattern("GET_WORKING_DAYS")
  async findAll({
    findOptions,
    page,
    limit,
  }: {
    findOptions: any;
    page: number;
    limit: number;
  }) {
    return await this.workingDaysService.find(findOptions);
  }

  /**
   * TODO Done
   */
  @EventPattern("CREATE_WORKING_DAY")
  @ApiBody({ type: UpdateWorkingDaysDto })
  createOne({ body }: { body: WorkingDays }) {
    return this.workingDaysService.createOne(body);
  }

  /**
   * TODO Done
   */
  @EventPattern("UPDATE_WORKING_DAY")
  @ApiBody({ type: UpdateWorkingDaysDto })
  patchOne({
    id,
    body,
  }: {
    id: string;
    body: WorkingDays;
  }): Promise<IReturnType> {
    return this.workingDaysService.patchOne(id, body);
  }
}

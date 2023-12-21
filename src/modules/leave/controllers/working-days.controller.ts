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
  async findAll({ findOptions }: { findOptions: any }) {
    return await this.workingDaysService.find(findOptions);
  }

  /**
   * TODO Done
   */
  @MessagePattern("CREATE_WORKING_DAY")
  @ApiBody({ type: UpdateWorkingDaysDto })
  async createOne({ body }: { body: WorkingDays }) {
    return await this.workingDaysService.createOne(body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("UPDATE_WORKING_DAY")
  @ApiBody({ type: UpdateWorkingDaysDto })
  async patchOne({
    id,
    body,
  }: {
    id: string;
    body: WorkingDays;
  }): Promise<IReturnType> {
    return await this.workingDaysService.patchOne(id, body);
  }
}

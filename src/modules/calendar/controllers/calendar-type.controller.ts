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
import { CalendarTypeService } from "../services/calendar-type.service";
import { QueryParserPipe } from "src/common/pipes/queryParser.pipe";
import { CreateCalendarTypeDto, UpdateCalendarTypeDto } from "../dto";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
@ApiTags("CalendarType")
@Controller("calendar/type")
export class CalendarTypeController {
  constructor(private readonly calendarTypeService: CalendarTypeService) {}
  /**
   * TODO Done
   */
  @MessagePattern("GET_ALL_CALENDAR_TYPES")
  findAll({
    findOptions,
    page,
    limit,
  }: {
    findOptions: any;
    page: number;
    limit: number;
  }) {
    return this.calendarTypeService.findAll(findOptions, page, limit);
  }

  /**
   * TODO Done
   */
  @MessagePattern("CREATE_CALENDAR_TYPE")
  async createOne({
    body,
    user_id,
  }: {
    body: CreateCalendarTypeDto;
    user_id: string;
  }) {
    return await this.calendarTypeService.createOne(body, user_id);
  }

  /**
   * TODO Done
   */
  @MessagePattern("UPDATE_CALENDAR_TYPE")
  async patchOne({ id, body }: { id: string; body: UpdateCalendarTypeDto }) {
    console.log({ body });
    return await this.calendarTypeService.patchOne(id, body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("DELETE_CALENDAR_TYPE")
  async deleteOne({ id }: { id: string }) {
    return await this.calendarTypeService.deleteOne(id);
  }
}

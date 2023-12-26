import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { CalendarService } from "../services/calendar.service";
import { QueryParserPipe } from "src/common/pipes/queryParser.pipe";
import { paginateResponse } from "src/common/helpers/paginate-response";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { CreateCalendarDto, UpdateCalendarDto } from "../dto";
import { MessagePattern } from "@nestjs/microservices";

@ApiTags("Calendar")
@Controller("calendar")
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  /**
   * TODO Done
   */
  @MessagePattern("GET_ALL_CALENDARS")
  async findAll({
    ids,
    findOptions,
    page,
    limit,
  }: {
    ids: string[];
    findOptions: any;
    page: number;
    limit: number;
  }) {
    findOptions.take = limit;
    findOptions.skip = (page - 1) * limit;
    const data = await this.calendarService.findAll(ids, findOptions);
    return paginateResponse(data, page, limit);
  }

  /**
   * TODO Done
   */
  @MessagePattern("GET_ONE_CALENDAR_BY_ID")
  async findOne({
    findOptions,
    id,
  }: {
    findOptions: any;
    id: string;
  }): Promise<IReturnType> {
    return await this.calendarService.findOne(findOptions, id);
  }
  /**
   *
   * TODO done
   */
  @MessagePattern("CREATE_ONE_CALENDAR")
  @ApiBody({ type: CreateCalendarDto })
  async createOne({ body }: { body: CreateCalendarDto }) {
    return await this.calendarService.createOne(body);
  }

  /**
   * TODO done
   */
  @MessagePattern("UPDATE_ONE_CALENDAR")
  @ApiBody({ type: UpdateCalendarDto })
  async patchOne({
    id,
    body,
  }: {
    id: string;
    body: UpdateCalendarDto;
  }): Promise<IReturnType> {
    return await this.calendarService.patchOne(id, body);
  }

  /**
   * TODO Done
   */
  @MessagePattern("DELETE_CALENDAR")
  async delete({ id }: { id: string }) {
    return await this.calendarService.deleteOne(id);
  }

  /**
   * TODO Done
   */
  @MessagePattern("UPCOMING_CALENDAR_EVENT")
  async getUpcomingEvents(): Promise<IReturnType> {
    return await this.calendarService.getUpcomingEvents();
  }
}

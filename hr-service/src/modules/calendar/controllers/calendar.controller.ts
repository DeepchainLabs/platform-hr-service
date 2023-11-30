import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { CalendarService } from "../services/calendar.service";
import { QueryParserPipe } from "src/common/pipes/queryParser.pipe";
import { paginateResponse } from "src/common/helpers/paginate-response";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { CreateCalendarDto, UpdateCalendarDto } from "../dto";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

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
  findOne({
    findOptions,
    id,
  }: {
    findOptions: any;
    id: string;
  }): Promise<IReturnType> {
    return this.calendarService.findOne(findOptions, id);
  }
  /**
   *
   * TODO done
   */
  @EventPattern("CREATE_ONE_CALENDAR")
  @ApiBody({ type: CreateCalendarDto })
  createOne({ body }: { body: CreateCalendarDto }) {
    return this.calendarService.createOne(body);
  }

  /**
   * TODO done
   */
  @EventPattern("UPDATE_ONE_CALENDAR")
  @ApiBody({ type: UpdateCalendarDto })
  patchOne({
    id,
    body,
  }: {
    id: string;
    body: UpdateCalendarDto;
  }): Promise<IReturnType> {
    return this.calendarService.patchOne(id, body);
  }

  /**
   * TODO Done
   */
  @EventPattern("DELETE_CALENDAR")
  delete({ id }: { id: string }) {
    return this.calendarService.deleteOne(id);
  }

  /**
   * TODO Done
   */
  @MessagePattern("UPCOMING_CALENDAR_EVENT")
  getUpcomingEvents(): Promise<IReturnType> {
    return this.calendarService.getUpcomingEvents();
  }
}

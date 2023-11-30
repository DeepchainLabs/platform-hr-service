import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom.exception";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { ICalendar } from "src/modules/calendar/interfaces/calendar.interface";
import { CalendarService } from "src/modules/calendar/services/calendar.service";

@Injectable()
export class CalendarDependency {
  constructor(
    @Inject(forwardRef(() => CalendarService))
    private calendarService: CalendarService,
  ) {}

  async getCalendar(calendarId: string): Promise<ICalendar> {
    try {
      const response: IReturnType = await this.calendarService.findOneById(
        calendarId,
      );
      return response.data;
    } catch (err) {
      throw new CustomException(CalendarDependency.name, "getCalendar", err);
    }
  }

  async getAllHolidaysByPeriod(period: string): Promise<number> {
    try {
      const data: number = await this.calendarService.findAllHolidaysByPeriod(
        period,
      );
      return data;
    } catch (err) {
      throw new CustomException(
        CalendarDependency.name,
        "getAllHolidaysByPeriod",
        err,
      );
    }
  }
}

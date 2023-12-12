import { HttpStatus, Injectable } from "@nestjs/common";
import { CalendarRepository } from "../repositories/calendar.repository";
import { HttpExceptionWithLog } from "src/common/exceptions/HttpExceptionWithLog.exceptions";
import { CustomException } from "src/common/exceptions/custom.exception";

@Injectable()
export class CalendarExtras {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  async checkIfCalendarExists(id: string): Promise<void> {
    try {
      const calendar = await this.calendarRepository.findOneById(id);
      if (!calendar)
        throw new HttpExceptionWithLog(
          "calendar not found",
          HttpStatus.NOT_FOUND,
          CalendarExtras.name,
          "checkIfCalendarExists",
        );
    } catch (err) {
      throw new CustomException(
        CalendarExtras.name,
        "checkIfCalendarExists",
        err,
      );
    }
  }

  async checkDuplicate(
    title: string,
    start_date: Date,
    end_date?: Date,
    id?: string,
  ): Promise<void> {
    try {
      const count = await this.calendarRepository.count(title, start_date, id);

      if (count)
        throw new HttpExceptionWithLog(
          "calendar already exists",
          HttpStatus.CONFLICT,
          CalendarExtras.name,
          "checkDuplicate",
        );
    } catch (err) {
      throw new CustomException(CalendarExtras.name, "checkDuplicate", err);
    }
  }
}

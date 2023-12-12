import { HttpStatus, Injectable } from "@nestjs/common";
import { CalendarTypeRepository } from "../repositories/calendar-type.repository";
import { HttpExceptionWithLog } from "src/common/exceptions/HttpExceptionWithLog.exceptions";
import { CustomException } from "src/common/exceptions/custom.exception";

@Injectable()
export class CalendarTypeExtras {
  constructor(
    private readonly calendarTypeRepository: CalendarTypeRepository,
  ) {}

  async checkIfCalendarTypeExists(id: string): Promise<void> {
    try {
      const calendarType = await this.calendarTypeRepository.findOneById(id);
      if (!calendarType)
        throw new HttpExceptionWithLog(
          "calendarType not found",
          HttpStatus.NOT_FOUND,
          CalendarTypeExtras.name,
          "checkIfCalendarTypeExists",
        );
    } catch (err) {
      throw new CustomException(
        CalendarTypeExtras.name,
        "checkIfCalendarTypeExists",
        err,
      );
    }
  }

  async checkDuplicate(title: string, id?: string): Promise<void> {
    try {
      const count = await this.calendarTypeRepository.count(title, id);
      if (count)
        throw new HttpExceptionWithLog(
          "calendarType already exists",
          HttpStatus,
          CalendarTypeExtras.name,
          "checkDuplicate",
        );
    } catch (err) {
      throw new CustomException(CalendarTypeExtras.name, "checkDuplicate", err);
    }
  }
}

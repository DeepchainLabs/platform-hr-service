import {
  BadRequestException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Between, MoreThanOrEqual } from "typeorm";
import { CreateCalendarDto, UpdateCalendarDto } from "../dto";
import { CalendarExtras } from "../extras/calendar.extra";
import { ICalendar } from "../interfaces/calendar.interface";
import { CalendarRepository } from "../repositories/calendar.repository";
import { CalendarTypeService } from "./calendar-type.service";
import * as moment from "moment";
import { CustomException } from "src/common/exceptions/custom.exception";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { paginateResponse } from "src/common/helpers/paginate-response";
import { HttpExceptionWithLog } from "src/common/exceptions/HttpExceptionWithLog.exceptions";

@Injectable()
export class CalendarService {
  constructor(
    private calendarRepository: CalendarRepository,
    @Inject(forwardRef(() => CalendarTypeService))
    private calendarTypeService: CalendarTypeService,
    private readonly calendarExtra: CalendarExtras,
  ) {}

  async findAll(
    ids: string[],
    findOptions: any,
  ): Promise<[ICalendar[], number]> {
    let data: [ICalendar[], number];
    try {
      data = await this.calendarRepository.findAndCountWithTypeFilter(
        ids,
        findOptions,
      );
      return data;
    } catch (err) {
      throw new CustomException(
        CalendarService.name,
        "findAllWithPagination",
        err,
      );
    }
  }

  async findAllTest(findOption: any): Promise<IReturnType> {
    try {
      const data = await this.calendarRepository.find(findOption);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (error) {
      throw new CustomException(CalendarService.name, "findAll", error);
    }
  }
  async findAllWithPagination(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<IReturnType> {
    let data: [ICalendar[], number];
    try {
      data = await this.calendarRepository.findAndCount(findOptions);

      return {
        success: true,
        message: "",
        data: data[0],
        meta: paginateResponse(data, page, limit),
      };
    } catch (err) {
      throw new CustomException(
        CalendarService.name,
        "findAllWithPagination",
        err,
      );
    }
  }

  async findOne(findOptions: any, id: string): Promise<IReturnType> {
    try {
      if (id) {
        findOptions.where = findOptions.where
          ? { ...findOptions.where, id: id }
          : { id: id };
      }

      const data = await this.calendarRepository.findOne(findOptions);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarService.name, "findOne", err);
    }
  }

  async findOneById(id: string): Promise<IReturnType> {
    try {
      const data = await this.calendarRepository.findOneById(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarService.name, "findOneById", err);
    }
  }

  async createOne(dto: CreateCalendarDto): Promise<IReturnType> {
    try {
      await this.calendarExtra.checkDuplicate(dto.title, dto.start_date);

      const type = await this.calendarTypeService.findOneById(
        dto.type as string,
      );
      if (!type.data)
        throw new HttpExceptionWithLog(
          "calendar type not found",
          HttpStatus.NOT_FOUND,
          CalendarService.name,
          "createOne",
        );
      const data = await this.calendarRepository.create(dto);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarService.name, "createOne", err);
    }
  }

  async patchOne(id: string, dto: UpdateCalendarDto): Promise<IReturnType> {
    try {
      const calendar = await this.findOneById(id);
      if (!calendar)
        throw new HttpExceptionWithLog(
          "calendar not found",
          HttpStatus.NOT_FOUND,
          CalendarService.name,
          "patchOne",
        );
      const data = await this.calendarRepository.update(id, dto);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarService.name, "patchOne", err);
    }
  }

  async deleteOne(id: string): Promise<IReturnType> {
    try {
      const data = await this.calendarRepository.delete(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarService.name, "deleteOne", err);
    }
  }

  getMonthAndYearFromPeriod(period: string): [string | number, number] {
    try {
      const [month, year, ...extra] = period.split("-");
      // FIXME: parseInt("2abc50") returns 2 which indicates a valid month. If this happens, a wrong input for month can also treat as valid which should not happen. Update the return statement to avoid this issue.
      return [
        parseInt(month) || month,
        year ? parseInt(year) : moment().year(),
      ];
    } catch {
      throw new BadRequestException("Period not valid");
    }
  }

  /**
   * todo refactor
   * use moment to find leap year
   */
  isLeapYear(year: number): boolean {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  }

  /**
   * todo refactor
   * use moment to find total days of month
   */
  getTotalDaysOfAMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  /**
   * todo refactor
   * * use moment to get start and end date of month
   */
  getStartAndEndDateOfAMonth(
    month: string | number,
    year: number,
  ): [string, string] {
    const monthList: string[] = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const thirtyDayMonth: string[] = ["april", "june", "september", "november"];
    const thirtyOneDayMonth: string[] = [
      "january",
      "march",
      "may",
      "july",
      "august",
      "october",
      "december",
    ];

    // validity check for year and month
    if (typeof month === "number" && (month < 1 || month > 12))
      throw new BadRequestException("Month not valid");

    month =
      typeof month === "number" ? monthList[month - 1] : month.toLowerCase();
    if (!monthList.includes(month))
      throw new BadRequestException("Month not valid");
    if (("" + year).length != 4)
      throw new BadRequestException("Year not valid");

    if (month === "february") {
      if (this.isLeapYear(year))
        return [
          `${year}-${monthList.indexOf(month) + 1}-01`,
          `${year}-${monthList.indexOf(month) + 1}-29`,
        ];
      return [
        `${year}-${monthList.indexOf(month) + 1}-01`,
        `${year}-${monthList.indexOf(month) + 1}-28`,
      ];
    } else if (thirtyDayMonth.includes(month)) {
      return [
        `${year}-${monthList.indexOf(month) + 1}-01`,
        `${year}-${monthList.indexOf(month) + 1}-30`,
      ];
    } else if (thirtyOneDayMonth.includes(month)) {
      return [
        `${year}-${monthList.indexOf(month) + 1}-01`,
        `${year}-${monthList.indexOf(month) + 1}-31`,
      ];
    } else {
      throw new BadRequestException();
    }
  }

  /**
   * todo refactor this code
   * ! how can you determine that holidays ? why haven't you checked type?
   */
  async findAllHolidaysByPeriod(period: string): Promise<number> {
    try {
      const [month, year] = this.getMonthAndYearFromPeriod(period);
      const [startDate, endDate] = this.getStartAndEndDateOfAMonth(month, year);
      const data = await this.calendarRepository.findAndCount({
        where: { start_date: Between(startDate, endDate) },
      });
      return data[1];
    } catch (err) {
      throw new CustomException(CalendarService.name, "findOneById", err);
    }
  }

  async getUpcomingEvents(): Promise<IReturnType> {
    try {
      const data = await this.calendarRepository.find({
        where: { start_date: MoreThanOrEqual(new Date()) },
        limit: 5,
      });

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarService.name, "deleteOne", err);
    }
  }
}

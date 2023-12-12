import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateCalendarTypeDto, UpdateCalendarTypeDto } from "../dto";
import { CalendarTypeExtras } from "../extras/calendar-type.extra";
import { ICalendarType } from "../interfaces/calendar-type.interface";
import { CalendarTypeRepository } from "../repositories/calendar-type.repository";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { paginateResponse } from "src/common/helpers/paginate-response";
import { CustomException } from "src/common/exceptions/custom.exception";
import { HttpExceptionWithLog } from "src/common/exceptions/HttpExceptionWithLog.exceptions";

@Injectable()
export class CalendarTypeService {
  constructor(
    private calendarTypeRepository: CalendarTypeRepository,
    private readonly calendarTypeExtra: CalendarTypeExtras,
  ) {}

  async findAll(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<IReturnType> {
    let data: [ICalendarType[], number];
    try {
      data = await this.calendarTypeRepository.findAndCount(findOptions);
      return paginateResponse(data, page, limit);
    } catch (err) {
      throw new CustomException(
        CalendarTypeService.name,
        "findAllWithPagination",
        err,
      );
    }
  }

  async findAllTest(findOption: any): Promise<IReturnType> {
    try {
      const data = await this.calendarTypeRepository.find(findOption);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (error) {
      throw new CustomException(CalendarTypeService.name, "findAll", error);
    }
  }
  async findAllWithPagination(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<IReturnType> {
    let data: [ICalendarType[], number];
    try {
      data = await this.calendarTypeRepository.findAndCount(findOptions);

      return {
        success: true,
        message: "",
        data: data[0],
        meta: paginateResponse(data, page, limit),
      };
    } catch (err) {
      throw new CustomException(
        CalendarTypeService.name,
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

      const data = await this.calendarTypeRepository.findOne(findOptions);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarTypeService.name, "findOne", err);
    }
  }

  async findOneById(id: string): Promise<IReturnType> {
    try {
      const data = await this.calendarTypeRepository.findOneById(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarTypeService.name, "findOneById", err);
    }
  }

  async createOne(
    dto: CreateCalendarTypeDto,
    userId: string,
  ): Promise<IReturnType> {
    try {
      await this.calendarTypeExtra.checkDuplicate(dto.title);
      const data = await this.calendarTypeRepository.create({
        ...dto,
        created_by: userId,
      });
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarTypeService.name, "createOne", err);
    }
  }

  async patchOne(id: string, dto: UpdateCalendarTypeDto): Promise<IReturnType> {
    try {
      const calendarType = await this.findOneById(id);
      if (!calendarType)
        throw new HttpExceptionWithLog(
          "calendarType not found",
          HttpStatus.NOT_FOUND,
          CalendarTypeService.name,
          "patchOne",
        );
      const data = await this.calendarTypeRepository.update(id, dto);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarTypeService.name, "patchOne", err);
    }
  }

  async deleteOne(id: string): Promise<IReturnType> {
    try {
      const data = await this.calendarTypeRepository.delete(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(CalendarTypeService.name, "deleteOne", err);
    }
  }
}

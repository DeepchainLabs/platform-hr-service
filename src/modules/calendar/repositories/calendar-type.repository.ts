import { Injectable } from "@nestjs/common";
import { CalendarType } from "../entities/calendar-type.entity";
import { ICalendarType } from "../interfaces/calendar-type.interface";
import { CalendarTypeMapperInstance } from "../mappers/calendar-type.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomException } from "src/common/exceptions/custom.exception";

@Injectable()
export class CalendarTypeRepository {
  constructor(
    @InjectRepository(CalendarType)
    private calendarTypeRepository: Repository<CalendarType>,
  ) {}

  async find(findOptions?: any): Promise<ICalendarType[]> {
    try {
      const calendarTypes = await this.calendarTypeRepository.find(findOptions);
      return CalendarTypeMapperInstance.mapMany(calendarTypes);
    } catch (err) {
      throw new CustomException(CalendarTypeRepository.name, "find", err);
    }
  }

  async findAndCount(findOptions?: any): Promise<[ICalendarType[], number]> {
    try {
      const calendarTypes = await this.calendarTypeRepository.findAndCount(
        findOptions,
      );
      return [
        CalendarTypeMapperInstance.mapMany(calendarTypes[0]),
        calendarTypes[1],
      ];
    } catch (err) {
      throw new CustomException(
        CalendarTypeRepository.name,
        "findAndCount",
        err,
      );
    }
  }

  async findOneById(id: string): Promise<ICalendarType | null> {
    try {
      // const calendarType = await this.calendarTypeRepository.findOneBy({ uuid: id });
      const calendarType = await this.calendarTypeRepository
        .createQueryBuilder("calendarType")
        .where("calendarType.id = :id", { id })
        .getOne();
      return calendarType && CalendarTypeMapperInstance.mapOne(calendarType);
    } catch (err) {
      throw new CustomException(
        CalendarTypeRepository.name,
        "findOneById",
        err,
      );
    }
  }

  async findOne(
    findOptions?: any,
    tenantId?: string,
  ): Promise<ICalendarType | null> {
    try {
      const calendarType = await this.calendarTypeRepository.findOne(
        findOptions,
      );
      return calendarType && CalendarTypeMapperInstance.mapOne(calendarType);
    } catch (err) {
      throw new CustomException(CalendarTypeRepository.name, "findOne", err);
    }
  }

  async count(title: string, id?: string): Promise<number> {
    try {
      const count = await this.calendarTypeRepository.count({
        where: {
          title: title,
          id: id,
        },
      });
      return count;
    } catch (err) {
      throw new CustomException(CalendarTypeRepository.name, "count", err);
    }
  }

  async create(data: ICalendarType, tenantId?: string): Promise<ICalendarType> {
    console.log(
      "🚀 ~ file: calendar-type.repository.ts:111 ~ CalendarTypeRepository ~ tenantId",
      tenantId,
    );
    try {
      const createdOne = this.calendarTypeRepository.create(data);
      const calendarType = await this.calendarTypeRepository.save(createdOne);
      return CalendarTypeMapperInstance.mapOne(calendarType);
    } catch (err) {
      throw new CustomException(CalendarTypeRepository.name, "create", err);
    }
  }

  async update(id: string, data: ICalendarType): Promise<ICalendarType | null> {
    try {
      await this.calendarTypeRepository
        .createQueryBuilder()
        .update(data)
        .where({ id: id })
        .execute();
      return await this.findOneById(id);
    } catch (err) {
      throw new CustomException(CalendarTypeRepository.name, "update", err);
    }
  }

  // TODO: what to return here
  async delete(id: string): Promise<any> {
    try {
      return await this.calendarTypeRepository.delete(id);
    } catch (err) {
      throw new CustomException(CalendarTypeRepository.name, "delete", err);
    }
  }
}

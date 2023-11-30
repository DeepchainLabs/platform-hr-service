import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Calendar } from "../entities/calendar.entity";
import { ICalendar } from "../interfaces/calendar.interface";
import { CalendarMapperInstance } from "../mappers/calendar.mapper";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
  ) {}

  async find(findOptions?: any): Promise<ICalendar[]> {
    try {
      const calendars = await this.calendarRepository.find(findOptions);
      return CalendarMapperInstance.mapMany(calendars);
    } catch (err) {
      throw new BadRequestException(err);
    }

    // const calendars = await this.dataSource.getRepository(Calendar).createQueryBuilder('calendar').getMany();
  }
  async findAndCountWithTypeFilter(
    ids: string[],
    findOptions?: any,
  ): Promise<[ICalendar[], number]> {
    try {
      console.log("qqqqq ", ids);
      const calendars = await this.calendarRepository.findAndCount({
        take: findOptions?.take,
        where: {
          calendarType: { id: In(ids?.map((i) => i)) },
        },
        relations: {
          calendarType: true,
        },
      });
      return [CalendarMapperInstance.mapMany(calendars[0]), calendars[1]];
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAndCount(findOptions?: any): Promise<[ICalendar[], number]> {
    try {
      const calendars = await this.calendarRepository.findAndCount(findOptions);
      return [CalendarMapperInstance.mapMany(calendars[0]), calendars[1]];
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOneById(id: string): Promise<ICalendar | null> {
    try {
      // const calendar = await this.calendarRepository.findOneBy({ uuid: id });
      const calendar = await this.calendarRepository
        .createQueryBuilder("calendar")
        .where("calendar.id = :id", { id })
        .getOne();
      return calendar && CalendarMapperInstance.mapOne(calendar);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(
    findOptions?: any,
    tenantId?: string,
  ): Promise<ICalendar | null> {
    try {
      const calendar = await this.calendarRepository.findOne(findOptions);
      return calendar && CalendarMapperInstance.mapOne(calendar);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async count(title: string, date: Date, id?: string): Promise<number> {
    try {
      const count = this.calendarRepository.count({
        where: {
          title: title,
          start_date: date,
          id: id,
        },
      });
      return count;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async create(data: ICalendar, tenantId?: string): Promise<ICalendar> {
    try {
      const createdOne = this.calendarRepository.create(data);
      const calendar = await this.calendarRepository.save(createdOne);
      return CalendarMapperInstance.mapOne(calendar);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: string, data: ICalendar): Promise<ICalendar | null> {
    try {
      await this.calendarRepository
        .createQueryBuilder()
        .update(data)
        .where({ id: id })
        .execute();
      return await this.findOneById(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // TODO: what to return here
  async delete(id: string): Promise<any> {
    try {
      return await this.calendarRepository.softDelete({ id: id });
      // return await this.dataSource.getRepository(Calendar).createQueryBuilder("calendar").where('calendar.id = :id', { id }).delete()
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

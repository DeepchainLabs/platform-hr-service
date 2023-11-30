import { CalendarType } from '../entities/calendar-type.entity';
import { ICalendarType } from '../interfaces/calendar-type.interface';
import { CalendarTypeModel } from '../models/calendar-type.model';

class CalendarTypeMapper {
    mapMany(types: CalendarType[]): ICalendarType[] {
        const list: ICalendarType[] = [];
        types.forEach((type) =>
            list.push(type ? new CalendarTypeModel(type) : type)
        );

        return list;
    }

    mapOne(type: CalendarType): ICalendarType {
        return type ? new CalendarTypeModel(type) : type;
    }
}

const CalendarTypeMapperInstance = new CalendarTypeMapper();
export { CalendarTypeMapperInstance };

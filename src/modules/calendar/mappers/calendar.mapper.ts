import { Calendar } from '../entities/calendar.entity';
import { ICalendar } from '../interfaces/calendar.interface';
import { CalendarModel } from '../models/calendar.model';

class CalendarMapper {
    mapMany(calendars: Calendar[]): ICalendar[] {
        const list: ICalendar[] = [];
        calendars.forEach((calendar) =>
            list.push(calendar ? new CalendarModel(calendar) : calendar)
        );

        return list;
    }

    mapOne(calendar: Calendar): ICalendar {
        return calendar ? new CalendarModel(calendar) : calendar;
    }
}

const CalendarMapperInstance = new CalendarMapper();
export { CalendarMapperInstance };

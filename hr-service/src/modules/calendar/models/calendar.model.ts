import { ICalendar } from '../interfaces/calendar.interface';

export class CalendarModel {
    constructor(options: ICalendar) {
        Object.assign(this, options);
    }
}

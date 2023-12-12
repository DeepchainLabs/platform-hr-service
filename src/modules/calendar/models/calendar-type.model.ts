import { ICalendarType } from '../interfaces/calendar-type.interface';

export class CalendarTypeModel {
    constructor(options: ICalendarType) {
        Object.assign(this, options);
    }
}

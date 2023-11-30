import { CreateCalendarDto } from '../dto/create-calendar.dto';
import { UpdateCalendarDto } from '../dto/update-calendar.dto';

export abstract class ICalendarService {
    findAll(findOptions: any, page: number, limit: number) {}
    findOneById(id: string) {}
    getCalendar(id: string) {}
    createOne(dto: CreateCalendarDto) {}
    patchOne(id: string, dto: UpdateCalendarDto) {}
    deleteOne(id: string) {}
}

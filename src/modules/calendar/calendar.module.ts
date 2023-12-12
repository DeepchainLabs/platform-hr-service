import { forwardRef, Module } from "@nestjs/common";
import { CalendarService } from "./services/calendar.service";
import { CalendarController } from "./controllers/calendar.controller";
import { CalendarRepository } from "./repositories/calendar.repository";
import { CalendarExtras } from "./extras/calendar.extra";
import { CalendarTypeController } from "./controllers/calendar-type.controller";
import { CalendarTypeService } from "./services/calendar-type.service";
import { CalendarTypeExtras } from "./extras/calendar-type.extra";
import { CalendarTypeRepository } from "./repositories/calendar-type.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Calendar } from "./entities/calendar.entity";
import { CalendarType } from "./entities/calendar-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Calendar, CalendarType])],
  controllers: [CalendarController, CalendarTypeController],
  providers: [
    // services
    CalendarService,
    CalendarTypeService,
    // repositories
    CalendarRepository,
    CalendarTypeRepository,
    // dependencies
    // extras
    CalendarExtras,
    CalendarTypeExtras,
    // others
  ],
  exports: [
    CalendarService,
    CalendarTypeService,
    CalendarRepository,
    CalendarTypeRepository,
  ],
})
export class CalendarModule {}

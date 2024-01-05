import { TypeOrmModule } from "@nestjs/typeorm";
import { seeder } from "nestjs-seeder";
import dataSourceOptions from "./config/database";
import { SessionInfoFactory } from "./database/factories/session-info.factory";
import { LeaveCategoryFactory } from "./database/factories/leave-category.factory";
import { LeaveTypeFactory } from "./database/factories/leave-type.factory";
import { LeaveApplicationFactory } from "./database/factories/leave-application.factory";
import { SessionSeeder } from "./database/seeders/session.seeder";
import { LeaveCategorySeeder } from "./database/seeders/leave-category.seeder";
import { LeaveTypeSeeder } from "./database/seeders/leave-type.seeder";
import { LeaveApplicationSeeder } from "./database/seeders/leave-application.seeder";
import { LeaveApplicationAttachmentFactory } from "./database/factories/leave-application-attachment.factory";
import { LeaveApplicationAttachmentSeeder } from "./database/seeders/leave-application-attachment.seeder";
import { WorkingDayFactory } from "./database/factories/working_day.factory";
import { CalendarTypeFactory } from "./database/factories/calendar_type.factory";
import { CalendarFactory } from "./database/factories/calendar.factory";
import { WorkingDaySeeder } from "./database/seeders/working-day.seeder";
import { CalendarTypeSeeder } from "./database/seeders/calendar-type.seeder";
import { CalendarSeeder } from "./database/seeders/calendar.seeder";

seeder({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [__dirname + "/database/factories/*.factory.{ts,js}"],
    }),
    TypeOrmModule.forFeature([
      SessionInfoFactory,
      LeaveCategoryFactory,
      LeaveTypeFactory,
      LeaveApplicationFactory,
      LeaveApplicationAttachmentFactory,
      WorkingDayFactory,
      CalendarTypeFactory,
      CalendarFactory,
    ]),
  ],
}).run([
  SessionSeeder,
  LeaveCategorySeeder,
  LeaveTypeSeeder,
  LeaveApplicationSeeder,
  LeaveApplicationAttachmentSeeder,
  WorkingDaySeeder,
  CalendarTypeSeeder,
  CalendarSeeder,
]);

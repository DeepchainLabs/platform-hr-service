import { forwardRef, Module } from "@nestjs/common";
import { LeaveApplicationController } from "./controllers/leave-application.controller";
import { LeaveApplicationRepository } from "./repositories/leave-application.repository";
import { LeaveApplicationService } from "./services/leave-application.service";
import { LeaveTypeService } from "./services/leave-type.service";
import { LeaveAttachmentService } from "./services/leave-attachment.service";
import { LeaveAttachmentRepository } from "./repositories/leave-attachment.repository";
import { LeaveTypeController } from "./controllers/leave-type.controller";
import { LeaveInfoController } from "./controllers/leave-info.controller";
import { LeaveInfoService } from "./services/leave-info.service";
import { LeaveInfoRepository } from "./repositories/leave-info.repository";
import { CalendarDependency } from "./dependencies/calendar.dependency";
import { WorkingDaysRepository } from "./repositories/working-days.repository";
import { WorkingDaysService } from "./services/working-days.service";
import { WorkingDaysController } from "./controllers/working-days.controller";
import { CalendarModule } from "../calendar/calendar.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeaveApplication } from "./entities/leave-application.entity";
import { LeaveType } from "./entities/leave-type.entity";
import { LeaveAttachment } from "./entities/leave-attachment.entity";
import { LeaveInfo } from "./entities/session-info.entity";
import { WorkingDays } from "./entities/working-days.entity";
import { LeaveTypeRepository } from "./repositories/leave-type.repository";
import { LeaveCategoryService } from "./services/leave-category.service";
import { LeaveCategoryRepository } from "./repositories/leave-category.repository";
import { LeaveCategoryController } from "./controllers/leave-category.controller";
import { LeaveCategory } from "./entities/leave-category.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LeaveApplication,
      LeaveType,
      LeaveAttachment,
      LeaveInfo,
      WorkingDays,
      LeaveCategory,
    ]),
    forwardRef(() => CalendarModule),
  ],
  controllers: [
    LeaveApplicationController,
    LeaveTypeController,
    LeaveInfoController,
    WorkingDaysController,
    LeaveCategoryController,
  ],
  providers: [
    LeaveApplicationRepository,
    LeaveApplicationService,
    LeaveTypeRepository,
    LeaveTypeService,
    LeaveAttachmentRepository,
    LeaveAttachmentService,
    LeaveInfoRepository,
    LeaveInfoService,
    CalendarDependency,
    WorkingDaysRepository,
    WorkingDaysService,

    LeaveCategoryService,
    LeaveCategoryRepository,
  ],
  exports: [
    LeaveApplicationService,
    LeaveTypeService,
    LeaveInfoService,
    LeaveAttachmentService,

    // repositories
    LeaveApplicationRepository,
    LeaveTypeRepository,
    LeaveInfoRepository,
    LeaveApplicationRepository,
  ],
})
export class LeaveModule {}

// import { SprintService } from '@modules/sprint/services/sprint.service';
// import { TimeLogService } from '@modules/sprint/services/time-log.service';
// import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { CustomException } from 'src/common/exceptions/custom.exception';

// @Injectable()
// export class SprintDependency {
//     constructor(
//         @Inject(forwardRef(() => SprintService))
//         private sprintService: SprintService,
//         @Inject(forwardRef(() => TimeLogService))
//         private timeLogService: TimeLogService
//     ) {}
//     async getTotalWorkDaysByUserAndPeriod(
//         userId: string,
//         month: number,
//         year: number
//     ): Promise<number> {
//         try {
//             const data: number =
//                 await this.timeLogService.getTotalWorkDaysByUserAndPeriod(
//                     userId,
//                     month,
//                     year
//                 );
//             return data;
//         } catch (err) {
//             throw new CustomException(
//                 SprintDependency.name,
//                 'getTotalWorkDaysByUserAndPeriod',
//                 err
//             );
//         }
//     }
// }

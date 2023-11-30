// import { CustomException } from '@common/exceptions/custom.exception';
// import { IReturnType } from '@common/interfaces/return-type.interface';
// import { CreateNotificationDto } from '@modules/notifications/dto/create-notification.dto';
// import { NotificationService } from '@modules/notifications/services/notification.service';
// import { IUser } from '@modules/user/interfaces/user.interface';
// import { UserService } from '@modules/user/services/user.service';
// import { forwardRef, Inject, Injectable } from '@nestjs/common';

// @Injectable()
// export class NotificationDependency {
//     constructor(
//         @Inject(forwardRef(() => NotificationService))
//         private notificationService: NotificationService
//     ) {}
//     async createNotification(body: CreateNotificationDto) {
//         try {
//             const data = await this.notificationService.create(body);
//         } catch (err) {
//             throw new CustomException(
//                 NotificationDependency.name,
//                 'createNotification',
//                 err
//             );
//         }
//     }
//     async getAllNotificationTypes() {
//         try {
//             return await this.notificationService.findAllNotificationType();
//         } catch (err) {
//             throw new CustomException(
//                 NotificationDependency.name,
//                 'getAllNotificationTypes',
//                 err
//             );
//         }
//     }
//     async findAllWithPagination(findOptions?: any) {
//         try {
//             return await this.notificationService.findAllWithPagination(
//                 findOptions
//             );
//         } catch (err) {
//             throw new CustomException(
//                 NotificationDependency.name,
//                 'getAllNotificationTypes',
//                 err
//             );
//         }
//     }
// }

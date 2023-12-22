import { forwardRef, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateLeaveInfoDto } from "../dto/create-leave-info.dto";
import { UpdateLeaveInfoDto } from "../dto/update-leave-info.dto";
import { LeaveInfoRepository } from "../repositories/leave-info.repository";
import { ILeaveInfo } from "../interfaces/leave-info.interface";
import * as moment from "moment";
import { UserDependency } from "../dependencies/user.dependency";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { CustomException } from "src/common/exceptions/custom.exception";
import { paginateResponse } from "src/common/helpers/paginate-response";
import { HttpExceptionWithLog } from "src/common/exceptions/HttpExceptionWithLog.exceptions";
import { firstValueFrom, Observable } from "rxjs";
import { ClientRMQ } from "@nestjs/microservices";

@Injectable()
export class LeaveInfoService {
  constructor(
    private readonly leaveInfoRepository: LeaveInfoRepository,
    @Inject("UserService") private readonly userServiceClient: ClientRMQ,
  ) {}
  findManyUsers(): Observable<any> {
    return this.userServiceClient.send("FIND_MANY_USERS", {});
  }
  async findAll(findOptions?: any): Promise<IReturnType> {
    try {
      const data = await this.leaveInfoRepository.find(findOptions);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveInfoService.name, "findAll", err);
    }
  }

  async findAllWithPagination(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<IReturnType> {
    let data: [ILeaveInfo[], number];
    try {
      data = await this.leaveInfoRepository.findAndCount(findOptions);

      return paginateResponse(data, page, limit);
    } catch (err) {
      throw new CustomException(
        LeaveInfoService.name,
        "findAllWithPagination",
        err,
      );
    }
  }

  async findByUserId(userId: string): Promise<IReturnType> {
    try {
      const data = await this.leaveInfoRepository.find({
        where: { user_id: userId },
      });
      const users = await firstValueFrom(this.findManyUsers());
      const res: any = [];
      data &&
        data?.map((d: any) => {
          const user = users[d.user_id];
          const user_info = {
            id: d.user_id,
            name: user?.profile?.first_name + " " + user?.profile?.last_name,
            image: user?.profile?.image,
          };
          d.user_info = user_info;
        });
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveInfoService.name, "findOneById", err);
    }
  }

  async findOneById(id: string): Promise<IReturnType> {
    try {
      const data = await this.leaveInfoRepository.findOneById(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveInfoService.name, "findOneById", err);
    }
  }

  async findOne(findOptions: any, id?: string) {
    try {
      if (id) {
        findOptions.where = findOptions.where
          ? { ...findOptions.where, id: id }
          : { id: id };
      }

      const data = await this.leaveInfoRepository.findOne(findOptions);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveInfoService.name, "findOne", err);
    }
  }

  async getLatestInfo(userId: string, id?: string) {
    try {
      console.log({ userId, id });
      let findOptions: any = {
        where: { user_id: userId },
        order: { created_at: "desc" },
      };
      if (id) {
        findOptions = {
          where: { id: id },
          order: { created_at: "desc" },
        };
      }
      const latestInfo = await this.leaveInfoRepository.findOne(findOptions);
      console.log({ latestInfo });
      // // if (!latestInfo)
      // //   throw new HttpExceptionWithLog(
      // //     "no leave info found for user",
      // //     HttpStatus.NOT_FOUND,
      // //     LeaveInfoService.name,
      // //     "getLeaveInfoDetails",
      // //   );
      return latestInfo
        ? latestInfo
        : { message: "no leave info found for user" };
    } catch (err) {
      throw new CustomException(LeaveInfoService.name, "getLatestInfoId", err);
    }
  }

  // async getLeaveInfoDetails(userId: string, infoId?: string) {
  //     try {
  //         const user = await this.userDependency.getUser(userId);
  //         if (!user)
  //             throw new HttpExceptionWithLog(
  //                 'user not found',
  //                 HttpStatus.NOT_FOUND,
  //                 LeaveInfoService.name,
  //                 'getLeaveInfoDetails'
  //             );

  //         let info;

  //         if (infoId) {
  //             info = await this.leaveInfoRepository.findOneById(infoId);
  //             if (!info)
  //                 throw new HttpExceptionWithLog(
  //                     'leave info not found',
  //                     HttpStatus.NOT_FOUND,
  //                     LeaveInfoService.name,
  //                     'getLeaveInfoDetails'
  //                 );
  //         }

  //         info = await this.getLatestInfo(userId);
  //         const findOptions: any = {
  //             where: { id: info.id },
  //             relations: {
  //                 infoTypeMaps: { leaveType: true },
  //                 userProfile: true,
  //             },
  //         };
  //         const details = await this.leaveInfoRepository.findOne(findOptions);
  //         const data = {
  //             id: details.id,
  //             session: details.session,
  //             user: {
  //                 id: details.userProfile.user_id,
  //                 name: `${details.userProfile.first_name} ${details.userProfile.last_name}`,
  //                 image: details.userProfile.image,
  //             },
  //             types: {},
  //         };

  //         data.types = details.infoTypeMaps.map((map) => ({
  //             name: map.leaveType.title,
  //             total: map.leaveType.num_of_days_allowed,
  //             remaining: map.remaining_leaves,
  //         }));

  //         return {
  //             success: true,
  //             message: '',
  //             data: data,
  //         };
  //     } catch (err) {
  //         throw new CustomException(
  //             LeaveInfoService.name,
  //             'getLeaveInfoDetails',
  //             err
  //         );
  //     }
  // }

  async createOne(dto: CreateLeaveInfoDto): Promise<IReturnType> {
    try {
      const users = await firstValueFrom(this.findManyUsers());
      const user = users[dto.user_id];
      // const user = await this.userDependency.getUser(
      //     dto.user_id,
      //     tenantId
      // );
      // if (!user)
      //     throw new HttpExceptionWithLog(
      //         'user not found',
      //         HttpStatus.NOT_FOUND,
      //         LeaveInfoService.name,
      //         'createOne'
      //     );

      const startDate = moment(new Date(dto.start_date)).format("YYYY/MM/DD");
      const endDate = moment(startDate)
        .add(1, "year")
        .add(-1, "day")
        .format("YYYY/MM/DD");

      // creating a unique session name
      const session = `${user.username}: ${startDate} to ${endDate}`;

      const fetchInfo = await this.leaveInfoRepository.findOne({
        where: { session: session },
      });
      if (fetchInfo)
        throw new HttpExceptionWithLog(
          "leave info already exists",
          HttpStatus.CONFLICT,
          LeaveInfoService.name,
          "createOne",
        );

      const info = {
        ...dto,
        session: session,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
      };

      const data = await this.leaveInfoRepository.create(info);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveInfoService.name, "createOne", err);
    }
  }

  async patchOne(id: string, dto: UpdateLeaveInfoDto): Promise<IReturnType> {
    try {
      const info = await this.leaveInfoRepository.findOneById(id);
      if (!info)
        throw new HttpExceptionWithLog(
          "leave info not found",
          HttpStatus.NOT_FOUND,
          LeaveInfoService.name,
          "patchOne",
        );

      const data = await this.leaveInfoRepository.update(id, dto);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveInfoService.name, "patchOne", err);
    }
  }

  async deleteOne(id: string): Promise<IReturnType> {
    try {
      const data = await this.leaveInfoRepository.delete(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveInfoService.name, "deleteOne", err);
    }
  }
}

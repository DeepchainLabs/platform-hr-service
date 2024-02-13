import { Injectable } from "@nestjs/common";
import { LeaveApplication } from "../entities/leave-application.entity";
import { ILeaveApplication } from "../interfaces/leave-application.interface";
import { LeaveApplicationMapperInstance } from "../mappers/leave-application.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomException } from "src/common/exceptions/custom.exception";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class LeaveApplicationRepository {
  constructor(
    @InjectRepository(LeaveApplication)
    private leaveRepository: Repository<LeaveApplication>,
  ) {}

  async find(findOptions?: any): Promise<ILeaveApplication[]> {
    try {
      const data = await this.leaveRepository.find(findOptions);
      return LeaveApplicationMapperInstance.mapMany(data);
    } catch (err) {
      throw new RpcException("find" + err);
    }
  }

  async findAndCount(
    findOptions?: any,
    sort_by?: string,
    order?: string,
  ): Promise<any> {
    try {
      // console.log({ sort_by, order });
      if (sort_by && order) {
        if (sort_by === "start_date") {
          const tasks = await this.leaveRepository.findAndCount({
            ...findOptions,
            relations: { attachments: true, type: true },
            order: { start_date: order, status: "ASC" },
          });
          return [LeaveApplicationMapperInstance.mapMany(tasks[0]), tasks[1]];
        } else if (sort_by === "end_date") {
          const tasks = await this.leaveRepository.findAndCount({
            ...findOptions,
            relations: { attachments: true, type: true },
            order: { end_date: order, status: "ASC" },
          });
          return [LeaveApplicationMapperInstance.mapMany(tasks[0]), tasks[1]];
        } else if (sort_by === "status") {
          const tasks = await this.leaveRepository.findAndCount({
            ...findOptions,
            relations: { attachments: true, type: true },
            order: { status: "ASC" },
          });
          return [LeaveApplicationMapperInstance.mapMany(tasks[0]), tasks[1]];
        } else if (sort_by === "reason") {
          const tasks = await this.leaveRepository.findAndCount({
            ...findOptions,
            relations: { attachments: true, type: true },
            order: { reason: order, status: "ASC" },
          });
          return [LeaveApplicationMapperInstance.mapMany(tasks[0]), tasks[1]];
        } else if (sort_by === "leave_type" && order) {
          if (order === "ASC") {
            const tasks = await this.leaveRepository
              .createQueryBuilder("leaveApplication")
              .leftJoinAndSelect("leaveApplication.type", "leaveType")
              .orderBy("leaveType.title", "ASC") // 'ASC' or 'DESC' depending on your 'order' variable
              .addOrderBy("leaveApplication.status", "ASC") // Assuming you also want to sort by status within each leave type
              .getManyAndCount();
            return [LeaveApplicationMapperInstance.mapMany(tasks[0]), tasks[1]];
          } else {
            const tasks = await this.leaveRepository
              .createQueryBuilder("leaveApplication")
              .leftJoinAndSelect("leaveApplication.type", "leaveType")
              .orderBy("leaveType.title", "DESC") // 'ASC' or 'DESC' depending on your 'order' variable
              .addOrderBy("leaveApplication.status", "ASC") // Assuming you also want to sort by status within each leave type
              .getManyAndCount();
            return [LeaveApplicationMapperInstance.mapMany(tasks[0]), tasks[1]];
          }
        } else if (sort_by === "num_of_working_days") {
          const tasks = await this.leaveRepository.findAndCount({
            ...findOptions,
            relations: { attachments: true, type: true },
            order: { num_of_working_days: order, status: "ASC" },
          });
          return [LeaveApplicationMapperInstance.mapMany(tasks[0]), tasks[1]];
        } else if (sort_by === "applied_for") {
          const tasks = await this.leaveRepository.findAndCount({
            ...findOptions,
            relations: { attachments: true, type: true },
            order: { applied_for: order, status: "ASC" },
          });
          return [LeaveApplicationMapperInstance.mapMany(tasks[0]), tasks[1]];
        }
      } else {
        const tasks = await this.leaveRepository.findAndCount({
          ...findOptions,
          relations: { attachments: true, type: true },
          order: { status: "ASC" },
        });
        return [LeaveApplicationMapperInstance.mapMany(tasks[0]), tasks[1]];
      }
    } catch (err) {
      throw new CustomException(
        LeaveApplicationRepository.name,
        "findAndCount",
        err,
      );
    }
  }

  async findOneById(id: string): Promise<ILeaveApplication | null> {
    try {
      const leave = await this.leaveRepository
        .createQueryBuilder()
        .where("id = :id", { id })
        .getOne();
      return leave && LeaveApplicationMapperInstance.mapOne(leave);
    } catch (err) {
      throw new CustomException(
        LeaveApplicationRepository.name,
        "findOneById",
        err,
      );
    }
  }

  async findOne(
    findOptions?: any,
    tenantId?: string,
  ): Promise<ILeaveApplication | null> {
    try {
      const leave = await this.leaveRepository.findOne({
        ...findOptions,
        relations: { attachments: true },
      });
      return leave && LeaveApplicationMapperInstance.mapOne(leave);
    } catch (err) {
      throw new CustomException(
        LeaveApplicationRepository.name,
        "findOne",
        err,
      );
    }
  }

  async create(
    data: ILeaveApplication,
    tenantId?: string,
  ): Promise<ILeaveApplication> {
    try {
      const leave = await this.leaveRepository.save(data);
      return LeaveApplicationMapperInstance.mapOne(leave);
    } catch (err) {
      throw new RpcException("create" + err);
    }
  }

  async update(
    id: string,
    data: ILeaveApplication,
  ): Promise<ILeaveApplication | any> {
    try {
      await this.leaveRepository
        .createQueryBuilder()
        .update(data)
        .where({ id: id })
        .execute();
      return await this.findOneById(id);
    } catch (err) {
      throw new CustomException(LeaveApplicationRepository.name, "update", err);
    }
  }

  // TODO: what to return here
  async delete(id: string): Promise<any> {
    try {
      return await this.leaveRepository
        .createQueryBuilder()
        .softDelete()
        .where({ id: id })
        .execute();
    } catch (err) {
      throw new CustomException(LeaveApplicationRepository.name, "delete", err);
    }
  }
  // async findOneActiveConnection(user_id: string) {
  //     try {
  //         const result = await this.leaveRepository.query(
  //             `SELECT *
  //             FROM active_connections
  //             WHERE user_id = '${user_id}' and status = 'connected'
  //             ORDER BY connected_time DESC
  //             LIMIT 5;
  //            `
  //         );
  //         return result;
  //     } catch (err) {
  //         throw new CustomException(
  //             LeaveApplicationRepository.name,
  //             'findOneActiveConnection',
  //             err
  //         );
  //     }
  // }
}

import { Injectable } from "@nestjs/common";
import { LeaveInfo } from "../entities/session-info.entity";
import { ILeaveInfo } from "../interfaces/leave-info.interface";
import { LeaveInfoMapperInstance } from "../mappers/leave-info.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomException } from "src/common/exceptions/custom.exception";

@Injectable()
export class LeaveInfoRepository {
  constructor(
    @InjectRepository(LeaveInfo)
    private leaveInfoRepository: Repository<LeaveInfo>,
  ) {}

  async find(findOptions?: any): Promise<ILeaveInfo[]> {
    try {
      const data = await this.leaveInfoRepository.find(findOptions);
      return LeaveInfoMapperInstance.mapMany(data);
    } catch (err) {
      throw new CustomException(LeaveInfoRepository.name, "find", err);
    }
  }

  async findAndCount(findOptions?: any): Promise<[ILeaveInfo[], number]> {
    try {
      const infos = await this.leaveInfoRepository.findAndCount(findOptions);
      return [LeaveInfoMapperInstance.mapMany(infos[0]), infos[1]];
    } catch (err) {
      throw new CustomException(LeaveInfoRepository.name, "findAndCount", err);
    }
  }

  async findOneById(id: string): Promise<ILeaveInfo | null> {
    try {
      const info = await this.leaveInfoRepository
        .createQueryBuilder()
        .where("id = :id", { id })
        .getOne();
      return info && LeaveInfoMapperInstance.mapOne(info);
    } catch (err) {
      throw new CustomException(LeaveInfoRepository.name, "findOneById", err);
    }
  }

  async findOne(findOptions: any): Promise<ILeaveInfo | null> {
    try {
      const info = await this.leaveInfoRepository.findOne(findOptions);
      return info && LeaveInfoMapperInstance.mapOne(info);
    } catch (err) {
      throw new CustomException(LeaveInfoRepository.name, "findOne", err);
    }
  }

  async create(data: ILeaveInfo, tenantId?: string): Promise<ILeaveInfo> {
    try {
      const info = await this.leaveInfoRepository.save(data);
      return LeaveInfoMapperInstance.mapOne(info);
    } catch (err) {
      throw new CustomException(LeaveInfoRepository.name, "create", err);
    }
  }

  async update(id: string, data: ILeaveInfo): Promise<ILeaveInfo | null> {
    try {
      await this.leaveInfoRepository
        .createQueryBuilder()
        .update(data)
        .where({ id: id })
        .execute();
      return await this.findOneById(id);
    } catch (err) {
      throw new CustomException(LeaveInfoRepository.name, "update", err);
    }
  }

  // TODO: what to return here
  async delete(id: string): Promise<any> {
    try {
      return await this.leaveInfoRepository
        .createQueryBuilder()
        .softDelete()
        .where({ id: id })
        .execute();
    } catch (err) {
      throw new CustomException(LeaveInfoRepository.name, "delete", err);
    }
  }
}

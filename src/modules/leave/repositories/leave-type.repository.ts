import { Injectable } from "@nestjs/common";
import { LeaveType } from "../entities/leave-type.entity";
import { LeaveTypeMapperInstance } from "../mappers/leave-type.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomException } from "src/common/exceptions/custom.exception";
import { ILeaveType } from "../interfaces/leave-type.interface";

@Injectable()
export class LeaveTypeRepository {
  constructor(
    @InjectRepository(LeaveType)
    private leaveTypesRepository: Repository<LeaveType>,
  ) {}

  async find(findOptions?: any, tenantId?: string): Promise<ILeaveType[]> {
    try {
      const leaveTypes = await this.leaveTypesRepository.find(findOptions);
      return LeaveTypeMapperInstance.mapMany(leaveTypes);
    } catch (err) {
      throw new CustomException(LeaveTypeRepository.name, "find", err);
    }
  }

  async findAndCount(findOptions?: any): Promise<[ILeaveType[], number]> {
    try {
      findOptions.where = findOptions.where
        ? { ...findOptions.where, is_active: true }
        : { is_active: true };
      const leaveTypes = await this.leaveTypesRepository.findAndCount({
        ...findOptions,
        relations: { category: true },
      });
      return [LeaveTypeMapperInstance.mapMany(leaveTypes[0]), leaveTypes[1]];
    } catch (err) {
      throw new CustomException(LeaveTypeRepository.name, "findAndCount", err);
    }
  }
  async findAllActiveAndInactive(
    findOptions?: any,
  ): Promise<[ILeaveType[], number]> {
    try {
      const leaveTypes = await this.leaveTypesRepository.findAndCount(
        findOptions,
      );
      return [LeaveTypeMapperInstance.mapMany(leaveTypes[0]), leaveTypes[1]];
    } catch (err) {
      throw new CustomException(LeaveTypeRepository.name, "findAndCount", err);
    }
  }

  async findOneById(id: string): Promise<ILeaveType | null> {
    try {
      const leaveType = await this.leaveTypesRepository.findOneBy({
        id: id,
      });
      return leaveType && LeaveTypeMapperInstance.mapOne(leaveType);
    } catch (err) {
      throw new CustomException(LeaveTypeRepository.name, "findOneById", err);
    }
  }

  async findOne(
    findOptions?: any,
    tenantId?: string,
  ): Promise<ILeaveType | null> {
    try {
      const leaveType = await this.leaveTypesRepository.findOne({
        ...findOptions,
        relations: { category: true },
      });
      return leaveType && LeaveTypeMapperInstance.mapOne(leaveType);
    } catch (err) {
      throw new CustomException(LeaveTypeRepository.name, "findOne", err);
    }
  }

  async create(data: ILeaveType, tenantId?: string): Promise<ILeaveType> {
    try {
      const createdOne = this.leaveTypesRepository.create(data);
      const leaveType = await this.leaveTypesRepository.save(createdOne);
      return LeaveTypeMapperInstance.mapOne(leaveType);
    } catch (err) {
      throw new CustomException(LeaveTypeRepository.name, "create", err);
    }
  }

  async update(id: string, data: ILeaveType): Promise<ILeaveType | null> {
    try {
      await this.leaveTypesRepository
        .createQueryBuilder()
        .update(data)
        .where({ id: id })
        .execute();
      return await this.findOneById(id);
    } catch (err) {
      throw new CustomException(LeaveTypeRepository.name, "update", err);
    }
  }

  // TODO: what to return here
  async delete(id: string): Promise<any> {
    try {
      console.log("TTtttt");
      return await this.leaveTypesRepository.softDelete({ id: id });
    } catch (err) {
      throw new CustomException(LeaveTypeRepository.name, "delete", err);
    }
  }
}

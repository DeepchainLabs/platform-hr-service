import { Injectable } from "@nestjs/common";
import { LeaveType } from "../entities/leave-type.entity";
import { LeaveTypeMapperInstance } from "../mappers/leave-type.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomException } from "src/common/exceptions/custom.exception";
import { ILeaveCategory } from "../interfaces/leave-category.interface";
import { LeaveCategory } from "../entities/leave-category.entity";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class LeaveCategoryRepository {
  constructor(
    @InjectRepository(LeaveCategory)
    private leaveCategoryRepository: Repository<LeaveCategory>,
  ) {}

  async find(findOptions?: any, tenantId?: string): Promise<ILeaveCategory[]> {
    try {
      const leaveTypes = await this.leaveCategoryRepository.find(findOptions);
      return LeaveTypeMapperInstance.mapMany(leaveTypes);
    } catch (err) {
      throw new CustomException(LeaveCategoryRepository.name, "find", err);
    }
  }

  async findAndCount(findOptions?: any): Promise<[ILeaveCategory[], number]> {
    try {
      findOptions.where = findOptions.where
        ? { ...findOptions.where, is_active: true }
        : { is_active: true };
      const leaveTypes = await this.leaveCategoryRepository.findAndCount({
        ...findOptions,
        relations: { types: true },
      });
      return [LeaveTypeMapperInstance.mapMany(leaveTypes[0]), leaveTypes[1]];
    } catch (err) {
      throw new CustomException(
        LeaveCategoryRepository.name,
        "findAndCount",
        err,
      );
    }
  }
  async findAllActiveAndInactive(
    findOptions?: any,
  ): Promise<[ILeaveCategory[], number]> {
    try {
      const leaveTypes = await this.leaveCategoryRepository.findAndCount(
        findOptions,
      );
      return [LeaveTypeMapperInstance.mapMany(leaveTypes[0]), leaveTypes[1]];
    } catch (err) {
      throw new CustomException(
        LeaveCategoryRepository.name,
        "findAndCount",
        err,
      );
    }
  }

  async findOneById(id: string): Promise<ILeaveCategory | null> {
    try {
      const leaveType = await this.leaveCategoryRepository.findOneBy({
        id: id,
      });
      return leaveType && LeaveTypeMapperInstance.mapOne(leaveType);
    } catch (err) {
      throw new RpcException("Category not found");
    }
  }

  async findOne(
    findOptions?: any,
    tenantId?: string,
  ): Promise<ILeaveCategory | null> {
    try {
      const leaveType = await this.leaveCategoryRepository.findOne(findOptions);
      return leaveType && LeaveTypeMapperInstance.mapOne(leaveType);
    } catch (err) {
      throw new CustomException(LeaveCategoryRepository.name, "findOne", err);
    }
  }

  async create(
    data: ILeaveCategory,
    tenantId?: string,
  ): Promise<ILeaveCategory> {
    try {
      const createdOne = this.leaveCategoryRepository.create(data);
      const leaveType = await this.leaveCategoryRepository.save(createdOne);
      return LeaveTypeMapperInstance.mapOne(leaveType);
    } catch (err) {
      throw new RpcException("create" + err);
    }
  }

  async update(
    id: string,
    data: ILeaveCategory,
  ): Promise<ILeaveCategory | null> {
    try {
      await this.leaveCategoryRepository
        .createQueryBuilder()
        .update(data)
        .where({ id: id })
        .execute();
      return await this.findOneById(id);
    } catch (err) {
      throw new RpcException("update" + err);
    }
  }

  // TODO: what to return here
  async delete(id: string): Promise<any> {
    try {
      console.log("TTtttt");
      return await this.leaveCategoryRepository.softDelete({ id: id });
    } catch (err) {
      throw new CustomException(LeaveCategoryRepository.name, "delete", err);
    }
  }
}

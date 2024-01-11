import { forwardRef, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from "../dto";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { CustomException } from "src/common/exceptions/custom.exception";
import { HttpExceptionWithLog } from "src/common/exceptions/HttpExceptionWithLog.exceptions";
import { LeaveTypeRepository } from "../repositories/leave-type.repository";
import { ILeaveType } from "../interfaces/leave-type.interface";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class LeaveTypeService {
  constructor(private leaveTypeRepository: LeaveTypeRepository) {}

  async findAll(findOptions?: any, tenantId?: string): Promise<IReturnType> {
    try {
      const data = await this.leaveTypeRepository.find(findOptions, tenantId);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveTypeService.name, "findAll", err);
    }
  }

  async findAllWithPagination(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<[ILeaveType[], number]> {
    let data: [ILeaveType[], number];
    try {
      data = await this.leaveTypeRepository.findAndCount(findOptions);
      return data;
    } catch (err) {
      throw new CustomException(
        LeaveTypeService.name,
        "findAllWithPagination",
        err,
      );
    }
  }
  async findAllActiveAndInactive(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<[ILeaveType[], number]> {
    let data: [ILeaveType[], number];
    try {
      data = await this.leaveTypeRepository.findAllActiveAndInactive(
        findOptions,
      );
      return data;
    } catch (err) {
      throw new CustomException(
        LeaveTypeService.name,
        "findAllWithPagination",
        err,
      );
    }
  }

  async findOne(findOptions: any, id?: string) {
    try {
      if (id) {
        findOptions.where = findOptions.where
          ? { ...findOptions.where, id: id }
          : { id: id };
      }

      const data = await this.leaveTypeRepository.findOne(findOptions);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveTypeService.name, "findOne", err);
    }
  }

  async findOneById(id: string): Promise<IReturnType> {
    try {
      const data = await this.leaveTypeRepository.findOneById(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveTypeService.name, "findOneById", err);
    }
  }

  async createOne(dto: CreateLeaveTypeDto): Promise<IReturnType> {
    // try {
    const data = await this.leaveTypeRepository.create(dto);

    return {
      success: true,
      message: "Type Created",
      data: data,
    };
    // } catch (err) {
    //   throw new CustomException(LeaveTypeService.name, "createOne", err);
    // }
  }

  async patchOne(id: string, dto: UpdateLeaveTypeDto): Promise<IReturnType> {
    // try {
    const leaveType = await this.leaveTypeRepository.findOneById(id);
    if (!leaveType) throw new RpcException("Leave type not found");

    const data = await this.leaveTypeRepository.update(id, dto);

    return {
      success: true,
      message: "Type Updated",
      data: data,
    };
    // } catch (err) {
    //   throw new CustomException(LeaveTypeService.name, "patchOne", err);
    // }
  }

  async deleteOne(id: string): Promise<IReturnType> {
    try {
      const data = await this.leaveTypeRepository.delete(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveTypeService.name, "deleteOne", err);
    }
  }
}

import { forwardRef, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from "../dto";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { CustomException } from "src/common/exceptions/custom.exception";
import { HttpExceptionWithLog } from "src/common/exceptions/HttpExceptionWithLog.exceptions";
import { LeaveCategoryRepository } from "../repositories/leave-category.repository";
import { ILeaveCategory } from "../interfaces/leave-category.interface";
import { CreateLeaveCategoryDto } from "../dto/create-leave-category.dto";
import { UpdateLeaveCategoryDto } from "../dto/update-leave-category.dto";

@Injectable()
export class LeaveCategoryService {
  constructor(private leaveTypeRepository: LeaveCategoryRepository) {}

  async findAll(findOptions?: any, tenantId?: string): Promise<IReturnType> {
    try {
      const data = await this.leaveTypeRepository.find(findOptions, tenantId);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveCategoryService.name, "findAll", err);
    }
  }

  async findAllWithPagination(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<[ILeaveCategory[], number]> {
    let data: [ILeaveCategory[], number];
    try {
      data = await this.leaveTypeRepository.findAndCount(findOptions);
      return data;
    } catch (err) {
      throw new CustomException(
        LeaveCategoryService.name,
        "findAllWithPagination",
        err,
      );
    }
  }
  async findAllActiveAndInactive(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<[ILeaveCategory[], number]> {
    let data: [ILeaveCategory[], number];
    try {
      data = await this.leaveTypeRepository.findAllActiveAndInactive(
        findOptions,
      );
      return data;
    } catch (err) {
      throw new CustomException(
        LeaveCategoryService.name,
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
      throw new CustomException(LeaveCategoryService.name, "findOne", err);
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
      throw new CustomException(LeaveCategoryService.name, "findOneById", err);
    }
  }

  async createOne(dto: CreateLeaveCategoryDto): Promise<IReturnType> {
    try {
      const data = await this.leaveTypeRepository.create(dto);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveCategoryService.name, "createOne", err);
    }
  }

  async patchOne(
    id: string,
    dto: UpdateLeaveCategoryDto,
  ): Promise<IReturnType> {
    try {
      const leaveType = await this.leaveTypeRepository.findOneById(id);
      if (!leaveType)
        throw new HttpExceptionWithLog(
          "Leave type not found",
          HttpStatus.NOT_FOUND,
          LeaveCategoryService.name,
          "patchOne",
        );

      const data = await this.leaveTypeRepository.update(id, dto);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveCategoryService.name, "patchOne", err);
    }
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
      throw new CustomException(LeaveCategoryService.name, "deleteOne", err);
    }
  }
}

import { forwardRef, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from "../dto";
import { ILeaveType } from "../interfaces/leave-type.interface";
import { WorkingDaysRepository } from "../repositories/working-days.repository";
import { CustomException } from "src/common/exceptions/custom.exception";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { WorkingDays } from "../entities/working-days.entity";

@Injectable()
export class WorkingDaysService {
  constructor(private workingDaysRepository: WorkingDaysRepository) {}

  async find(findOptions: any) {
    try {
      const data = await this.workingDaysRepository.find(findOptions);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(WorkingDaysService.name, "find", err);
    }
  }
  async createOne(dto: WorkingDays) {
    try {
      await this.workingDaysRepository.createOne(dto);
    } catch (err) {
      throw new CustomException(WorkingDaysService.name, "patchOne", err);
    }
  }
  async patchOne(id: string, dto: WorkingDays): Promise<IReturnType> {
    try {
      const data = await this.workingDaysRepository.update(id, dto);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(WorkingDaysService.name, "patchOne", err);
    }
  }
}

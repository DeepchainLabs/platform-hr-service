import { HttpStatus, Injectable } from "@nestjs/common";
import { ILeaveAttachment } from "../interfaces/leave-attachment.interface";
import { LeaveAttachmentRepository } from "../repositories/leave-attachment.repository";
import { CustomException } from "src/common/exceptions/custom.exception";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { paginateResponse } from "src/common/helpers/paginate-response";
import { HttpExceptionWithLog } from "src/common/exceptions/HttpExceptionWithLog.exceptions";
import { CreateLeaveAttachmentDto } from "../dto";

@Injectable()
export class LeaveAttachmentService {
  constructor(private leaveAttachmentRepository: LeaveAttachmentRepository) {}

  async findAll(findOptions?: any): Promise<IReturnType> {
    try {
      const data = await this.leaveAttachmentRepository.find(findOptions);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveAttachmentService.name, "findAll", err);
    }
  }

  async findAllWithPagination(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<IReturnType> {
    let data: [ILeaveAttachment[], number];
    try {
      data = await this.leaveAttachmentRepository.findAndCount(findOptions);

      return {
        success: true,
        message: "",
        data: data[0],
        meta: paginateResponse(data, page, limit),
      };
    } catch (err) {
      throw new CustomException(LeaveAttachmentService.name, "findAll", err);
    }
  }

  async findOneById(id: string): Promise<IReturnType> {
    try {
      const data = await this.leaveAttachmentRepository.findOneById(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(
        LeaveAttachmentService.name,
        "findOneById",
        err,
      );
    }
  }

  async createOne(dto: CreateLeaveAttachmentDto): Promise<IReturnType> {
    try {
      const data = await this.leaveAttachmentRepository.create(dto);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveAttachmentService.name, "createOne", err);
    }
  }

  async patchOne(id: string, dto: any): Promise<IReturnType> {
    const leaveAttachment = await this.leaveAttachmentRepository.findOneById(
      id,
    );
    if (!leaveAttachment)
      throw new HttpExceptionWithLog(
        `LeaveAttachment ${id} not found`,
        HttpStatus.NOT_FOUND,
        LeaveAttachmentService.name,
        "patchOne",
      );

    try {
      await this.leaveAttachmentRepository.update(id, dto);
      const data = await this.findOneById(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveAttachmentService.name, "patchOne", err);
    }
  }

  async deleteOne(id: string) {
    try {
      const leaveAttachment = await this.findOneById(id);
      if (!leaveAttachment)
        throw new HttpExceptionWithLog(
          `LeaveAttachment ${id} not found`,
          HttpStatus.NOT_FOUND,
          LeaveAttachmentService.name,
          "deleteOne",
        );

      const data = await this.leaveAttachmentRepository.delete(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveAttachmentService.name, "deleteOne", err);
    }
  }
}

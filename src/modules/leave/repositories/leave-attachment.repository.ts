import { BadRequestException, Injectable } from "@nestjs/common";
import { LeaveAttachment } from "../entities/leave-attachment.entity";
import { ILeaveAttachment } from "../interfaces/leave-attachment.interface";
import { LeaveAttachmentMapperInstance } from "../mappers/leave-attachment.mapper";
import * as fs from "fs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomException } from "src/common/exceptions/custom.exception";

@Injectable()
export class LeaveAttachmentRepository {
  constructor(
    @InjectRepository(LeaveAttachment)
    private leaveAttachmentsRepository: Repository<LeaveAttachment>,
  ) {}
  async find(findOptions?: any): Promise<ILeaveAttachment[]> {
    try {
      const leaveAttachments = await this.leaveAttachmentsRepository.find(
        findOptions,
      );
      return LeaveAttachmentMapperInstance.mapMany(leaveAttachments);
    } catch (err) {
      throw new CustomException(LeaveAttachmentRepository.name, "find", err);
    }

    // const leaveAttachments = await this.dataSource.getRepository(LeaveAttachment).createQueryBuilder('leaveAttachment').getMany();
  }

  async findAndCount(findOptions?: any): Promise<[ILeaveAttachment[], number]> {
    try {
      const leaveAttachments =
        await this.leaveAttachmentsRepository.findAndCount(findOptions);
      return [
        LeaveAttachmentMapperInstance.mapMany(leaveAttachments[0]),
        leaveAttachments[1],
      ];
    } catch (err) {
      throw new CustomException(
        LeaveAttachmentRepository.name,
        "findAndCount",
        err,
      );
    }
  }

  async findOneById(id: string): Promise<ILeaveAttachment | null> {
    try {
      const leaveAttachment = await this.leaveAttachmentsRepository.findOneBy({
        id: id,
      });
      return (
        leaveAttachment && LeaveAttachmentMapperInstance.mapOne(leaveAttachment)
      );
    } catch (err) {
      throw new CustomException(
        LeaveAttachmentRepository.name,
        "findOneById",
        err,
      );
    }
  }

  async findOne(
    findOptions?: any,
    tenantId?: string,
  ): Promise<ILeaveAttachment | null> {
    try {
      const leaveAttachment = await this.leaveAttachmentsRepository.findOne(
        findOptions,
      );
      return (
        leaveAttachment && LeaveAttachmentMapperInstance.mapOne(leaveAttachment)
      );
    } catch (err) {
      throw new CustomException(LeaveAttachmentRepository.name, "findOne", err);
    }
  }

  async create(
    data: ILeaveAttachment,
    tenantId?: string,
  ): Promise<ILeaveAttachment> {
    try {
      const createdOne = this.leaveAttachmentsRepository.create(data);
      const leaveAttachment = await this.leaveAttachmentsRepository.save(
        createdOne,
      );
      return LeaveAttachmentMapperInstance.mapOne(leaveAttachment);
    } catch (err) {
      throw new CustomException(LeaveAttachmentRepository.name, "create", err);
    }
  }

  async update(
    id: string,
    data: ILeaveAttachment,
  ): Promise<ILeaveAttachment | null> {
    try {
      await this.leaveAttachmentsRepository
        .createQueryBuilder()
        .update(data)
        .where({ id: id })
        .execute();
      return await this.findOneById(id);
    } catch (err) {
      throw new CustomException(LeaveAttachmentRepository.name, "update", err);
    }
  }

  // TODO: what to return here
  async delete(id: string): Promise<any> {
    try {
      return await this.leaveAttachmentsRepository.delete(id);
    } catch (err) {
      throw new CustomException(LeaveAttachmentRepository.name, "delete", err);
    }
  }
}

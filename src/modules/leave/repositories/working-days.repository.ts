import { Injectable } from "@nestjs/common";
import { WorkingDays } from "../entities/working-days.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomException } from "src/common/exceptions/custom.exception";

@Injectable()
export class WorkingDaysRepository {
  constructor(
    @InjectRepository(WorkingDays)
    private workingDaysRepository: Repository<WorkingDays>,
  ) {}

  async find(findOptions?: any, tenantId?: string) {
    try {
      const res = await this.workingDaysRepository.find(findOptions);
      return res ? res[0] : {};
    } catch (err) {
      throw new CustomException(WorkingDaysRepository.name, "findOne", err);
    }
  }
  async createOne(data: WorkingDays) {
    try {
      const res = await this.workingDaysRepository.create(data);
      const days = await this.workingDaysRepository.save(res);
      return days;
    } catch (err) {
      throw new CustomException(WorkingDaysRepository.name, "findOne", err);
    }
  }

  async update(id: string, data: any) {
    try {
      await this.workingDaysRepository
        .createQueryBuilder()
        .update(data)
        .where({ id: id })
        .execute();
    } catch (err) {
      throw new CustomException(WorkingDaysRepository.name, "update", err);
    }
  }
}

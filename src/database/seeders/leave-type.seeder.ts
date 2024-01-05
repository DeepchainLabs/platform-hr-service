import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import axios from "axios";
import { LeaveTypeFactory } from "../factories/leave-type.factory";

@Injectable()
export class LeaveTypeSeeder implements Seeder {
  constructor(
    @InjectRepository(LeaveTypeFactory)
    private readonly leaveTypeRepository: Repository<LeaveTypeFactory>,
  ) {}

  async seed(): Promise<any> {
    const current_db_rows = await this.leaveTypeRepository.count();
    if (current_db_rows > 0) {
      return;
    }

    const type = this.leaveTypeRepository.create({
      id: "b12fef42-ed06-4ab0-9f32-ef0541bd1382",
      category_id: "537f3b17-3607-4061-a1e8-b163b7554b4c",
      title: "Sick",
      description:
        "paid time off from work that workers can use to stay home to address their health needs without losing pay.",
      status: "active",
      is_active: true,
    });
    await this.leaveTypeRepository.save(type);
  }

  async drop(): Promise<any> {
    return [];
  }
}

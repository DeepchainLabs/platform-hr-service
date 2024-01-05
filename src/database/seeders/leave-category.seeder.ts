import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import axios from "axios";
import { LeaveCategoryFactory } from "../factories/leave-category.factory";

@Injectable()
export class LeaveCategorySeeder implements Seeder {
  constructor(
    @InjectRepository(LeaveCategoryFactory)
    private readonly leaveCategoryRepository: Repository<LeaveCategoryFactory>,
  ) {}

  async seed(): Promise<any> {
    const current_db_rows = await this.leaveCategoryRepository.count();
    if (current_db_rows > 0) {
      return;
    }
    const category = this.leaveCategoryRepository.create({
      id: "537f3b17-3607-4061-a1e8-b163b7554b4c",
      title: "Sick",
      description:
        "paid time off from work that workers can use to stay home to address their health needs without losing pay.",
      num_of_days_allowed: 20,
      status: "active",
      is_active: true,
    });
    await this.leaveCategoryRepository.save(category);
  }

  async drop(): Promise<any> {
    return [];
  }
}

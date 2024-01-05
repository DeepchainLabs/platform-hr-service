import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import axios from "axios";
import { LeaveApplicationFactory } from "../factories/leave-application.factory";

@Injectable()
export class LeaveApplicationSeeder implements Seeder {
  constructor(
    @InjectRepository(LeaveApplicationFactory)
    private readonly leaveApplicationRepository: Repository<LeaveApplicationFactory>,
  ) {}

  async seed(): Promise<any> {
    const current_db_rows = await this.leaveApplicationRepository.count();
    if (current_db_rows > 0) {
      return;
    }
    const count = await axios.get(
      "http://localhost:5000/data-migration/count?table=leave_applications",
    );
    const total_rows = count.data;
    const batchSize = 2000;
    // Calculate the total number of pages
    const totalPages = Math.ceil(total_rows / batchSize);

    for (let page = 1; page <= totalPages; page++) {
      // Fetch data in batches
      const usersResponse = await axios.get(
        "http://localhost:5000/data-migration",
        {
          params: {
            table: "leave_applications",
            limit: batchSize,
            page: page,
          },
        },
      );

      const usersData = usersResponse.data;

      // Process the batch of data here
      //   console.log(`Fetched page ${page}:`, usersData);

      const data: any = [];

      for (const user of usersData.data) {
        user.leave_type_id = "b12fef42-ed06-4ab0-9f32-ef0541bd1382";
        user.category_id = "537f3b17-3607-4061-a1e8-b163b7554b4c";
        const userEntity = this.leaveApplicationRepository.create({
          ...user,
        });
        data.push(userEntity);
      }

      // Bulk save all users at once
      try {
        await this.leaveApplicationRepository.save(data);
        console.log("Data saved for page - ", page);
      } catch (error) {
        console.error("Error saving data for page", page, ":", error);
      }
    }
  }

  async drop(): Promise<any> {
    return [];
  }
}

import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import axios from "axios";
import { WorkingDayFactory } from "../factories/working_day.factory";

@Injectable()
export class WorkingDaySeeder implements Seeder {
  constructor(
    @InjectRepository(WorkingDayFactory)
    private readonly workingDayRepository: Repository<WorkingDayFactory>,
  ) {}

  async seed(): Promise<any> {
    const current_db_rows = await this.workingDayRepository.count();
    if (current_db_rows > 0) {
      return;
    }
    const count = await axios.get(
      "http://localhost:5000/data-migration/count?table=working_days",
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
            table: "working_days",
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
        const userEntity = this.workingDayRepository.create({
          ...user,
        });
        data.push(userEntity);
      }

      // Bulk save all users at once
      try {
        await this.workingDayRepository.save(data);
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

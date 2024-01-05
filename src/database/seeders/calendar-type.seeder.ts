import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import axios from "axios";
import { CalendarTypeFactory } from "../factories/calendar_type.factory";

@Injectable()
export class CalendarTypeSeeder implements Seeder {
  constructor(
    @InjectRepository(CalendarTypeFactory)
    private readonly calendarTypeRepository: Repository<CalendarTypeFactory>,
  ) {}

  async seed(): Promise<any> {
    const current_db_rows = await this.calendarTypeRepository.count();
    if (current_db_rows > 0) {
      return;
    }
    const count = await axios.get(
      "http://localhost:5000/data-migration/count?table=calendar_types",
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
            table: "calendar_types",
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
        const userEntity = this.calendarTypeRepository.create({
          ...user,
        });
        data.push(userEntity);
      }

      // Bulk save all users at once
      try {
        await this.calendarTypeRepository.save(data);
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

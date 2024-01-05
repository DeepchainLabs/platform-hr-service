import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import axios from "axios";
import { LeaveApplicationAttachmentFactory } from "../factories/leave-application-attachment.factory";

@Injectable()
export class LeaveApplicationAttachmentSeeder implements Seeder {
  constructor(
    @InjectRepository(LeaveApplicationAttachmentFactory)
    private readonly leaveApplicationAttachmentRepository: Repository<LeaveApplicationAttachmentFactory>,
  ) {}

  async seed(): Promise<any> {
    const current_db_rows =
      await this.leaveApplicationAttachmentRepository.count();
    if (current_db_rows > 0) {
      return;
    }
    const count = await axios.get(
      "http://localhost:5000/data-migration/count?table=leave_application_attachments",
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
            table: "leave_application_attachments",
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
        user.size = 100;
        user.type = "N/A";
        user.storage_type = "minio";
        const userEntity = this.leaveApplicationAttachmentRepository.create({
          ...user,
        });
        data.push(userEntity);
      }

      // Bulk save all users at once
      try {
        await this.leaveApplicationAttachmentRepository.save(data);
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

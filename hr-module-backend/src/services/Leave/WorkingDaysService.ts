import "server-only";
import { Service } from "typedi";
import { AppConfig } from "@/config";
import { RmqClient } from "@/internals/classes/RmqClient";

@Service()
export class WorkingDaysService extends RmqClient {
  constructor() {
    super(AppConfig.GENERIC_AMQP_URL, "HrServiceQueue");
  }
  getWorkingDays(
    options = {
      findOptions: {},
      page: 1,
      limit: 10,
    }
  ) {
    return this.send("GET_WORKING_DAYS", options);
  }
  createWorkingDay(data: any) {
    return this.emit("CREATE_WORKING_DAY", data);
  }
  updateWorkingDay(data: any) {
    return this.emit("UPDATE_WORKING_DAY", data);
  }
}

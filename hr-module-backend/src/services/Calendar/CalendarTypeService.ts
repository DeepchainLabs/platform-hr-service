import "server-only";
import { Service } from "typedi";
import { AppConfig } from "@/config";
import { RmqClient } from "@/internals/classes/RmqClient";

@Service()
export class CalendarTypeService extends RmqClient {
  constructor() {
    super(AppConfig.GENERIC_AMQP_URL, "HrServiceQueue");
  }

  getAllCalendarTypes(
    options = {
      findOptions: {},
      page: 1,
      limit: 10,
    }
  ) {
    return this.send("GET_ALL_CALENDAR_TYPES", options);
  }

  createCalendarType(data: any) {
    return this.emit("CREATE_CALENDAR_TYPE", data);
  }
}

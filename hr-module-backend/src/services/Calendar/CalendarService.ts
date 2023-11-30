import "server-only";
import { Service } from "typedi";
import { AppConfig } from "@/config";
import { RmqClient } from "@/internals/classes/RmqClient";

@Service()
export class CalendarService extends RmqClient {
  constructor() {
    super(AppConfig.GENERIC_AMQP_URL, "HrServiceQueue");
  }

  getAllCalendars(
    options = {
      ids: [
        "d7b1dab3-4ebe-4b28-8b49-f0a6ca09f955",
        "34aed7f7-a390-4ec4-b492-7af7305528e2",
      ],
      findOptions: {},
      page: 1,
      limit: 10,
    }
  ) {
    return this.send("GET_ALL_CALENDARS", options);
  }

  getOneCalendar(
    options = {
      findOptions: {},
      id: "d9f1bbd8-260d-4b35-8979-4e401aa5ec8b",
    }
  ) {
    return this.send("GET_ONE_CALENDAR_BY_ID", options);
  }

  getUpcomingEvents(
    options = {
      findOptions: {},
      id: "d9f1bbd8-260d-4b35-8979-4e401aa5ec8b",
    }
  ) {
    return this.send("UPCOMING_CALENDAR_EVENT", options);
  }
  createCalendar(data: any) {
    return this.emit("CREATE_ONE_CALENDAR", data);
  }
  updateCalendar(data: any) {
    return this.emit("UPDATE_ONE_CALENDAR", data);
  }
  deleteCalendar(data: any) {
    return this.emit("DELETE_CALENDAR", data);
  }
}

import "server-only";
import { Service } from "typedi";
import { AppConfig } from "@/config";
import { RmqClient } from "@/internals/classes/RmqClient";

@Service()
export class LeaveApplicationService extends RmqClient {
  constructor() {
    super(AppConfig.GENERIC_AMQP_URL, "HrServiceQueue");
  }
  getAllLeaveApplications(
    options = {
      findOptions: {},
      page: 1,
      limit: 10,
    }
  ) {
    return this.send("FIND_ALL_LEAVE_APPLICATION", options);
  }

  remainingLeaveByUserAndSession(
    options = {
      userId: "c80d1b56-3827-4d30-8777-70fccca45fc0",
      sessionId: "e3a496b2-4320-4c1d-9e4d-2835f01c0c9e",
    }
  ) {
    return this.send("TOTAL_REMAINING_LEAVE_BY_USER_ID_SESSION_ID", options);
  }

  findOneApplicationById(
    options = {
      findOptions: {},
      id: "51cdb700-7878-4a67-bcf8-bae76426f355",
    }
  ) {
    return this.send("FIND_ONE_APPLICATION_BY_ID", options);
  }

  createApplication(data: any) {
    return this.emit("CREATE_ONE_APPLICATION", data);
  }
  updateApplication(data: any) {
    return this.emit("UPDATE_ONE_APPLICATION", data);
  }
  updateApplicationStatus(data: any) {
    return this.emit("UPDATE_ONE_APPLICATION", data);
  }
  deleteApplication(data: any) {
    return this.emit("DELETE_ONE_APPLICATION_STATUS", data);
  }
}

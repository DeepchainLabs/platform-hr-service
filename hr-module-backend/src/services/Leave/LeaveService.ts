import "server-only";
import { Service } from "typedi";
import { AppConfig } from "@/config";
import { RmqClient } from "@/internals/classes/RmqClient";

@Service()
export class LeaveService extends RmqClient {
  constructor() {
    super(AppConfig.GENERIC_AMQP_URL, "HrServiceQueue");
  }

  getAllLeaveApplicationType(
    options = {
      findOptions: {},
      page: 1,
      limit: 10,
    }
  ) {
    return this.send("GET_ALL_LEAVE_APPLICATION_TYPE_WITH_PAGINATION", options);
  }
  getAllLeaveApplicationTypeActiveInactive(
    options = {
      findOptions: {},
      page: 1,
      limit: 10,
    }
  ) {
    return this.send(
      "GET_ALL_LEAVE_APPLICATION_TYPE_WITH_PAGINATION_ACTIVE_INACTIVE",
      options
    );
  }

  getOneLeaveApplicationType(
    options = {
      findOptions: {},
      id: "42035394-be54-420e-b323-be6cdb3fc5cd",
    }
  ) {
    return this.send("GET_ONE_LEAVE_APPLICATION_TYPE", options);
  }

  createOneLeaveApplicationType(data: any) {
    return this.emit("CREATE_ONE_LEAVE_APPLICATION_TYPE", data);
  }
  updateOneLeaveApplicationType(data: any) {
    return this.emit("UPDATE_ONE_LEAVE_APPLICATION_TYPE", data);
  }
  deleteOneLeaveApplicationType(data: any) {
    return this.emit("DELETE_ONE_LEAVE_APPLICATION_TYPE", data);
  }
}

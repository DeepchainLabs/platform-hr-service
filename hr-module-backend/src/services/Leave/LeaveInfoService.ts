import "server-only";
import { Service } from "typedi";
import { AppConfig } from "@/config";
import { RmqClient } from "@/internals/classes/RmqClient";

@Service()
export class LeaveInfoService extends RmqClient {
  constructor() {
    super(AppConfig.GENERIC_AMQP_URL, "HrServiceQueue");
  }
  getAllLeaveInfo(
    options = {
      findOptions: {},
      page: 1,
      limit: 10,
    }
  ) {
    return this.send("FIND_ALL_LEAVE_APPLICATION_INFO", options);
  }

  getAllLeaveInfoByUser(
    options = {
      user_id: "c80d1b56-3827-4d30-8777-70fccca45fc0",
    }
  ) {
    return this.send("FIND_ALL_LEAVE_APPLICATION_INFO_BY_USER", options);
  }
  getOneLeaveInfoById(
    options = {
      findOptions: {},
      id: "5a801e71-dc03-4a93-8683-83f02571c5c4",
    }
  ) {
    return this.send("FIND_ONE_LEAVE_APPLICATION_INFO_BY_ID", options);
  }

  getOneSessionByUser(
    options = {
      user_id: "c80d1b56-3827-4d30-8777-70fccca45fc0",
      id: "",
    }
  ) {
    return this.send("FIND_ONE_SESSION_BY_USER_ID", options);
  }

  createOneSession(data: any) {
    return this.emit("CREATE_ONE_LEAVE_SESSION", data);
  }
  deleteOneSession(data: any) {
    return this.emit("DELETE_ONE_LEAVE_SESSION", data);
  }
}

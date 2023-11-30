import { LeaveInfoService } from "@/services/Leave/LeaveInfoService";
import { LeaveService } from "@/services/Leave/LeaveService";
import { WorkingDaysService } from "@/services/Leave/WorkingDaysService";

import Container from "typedi";

export const dynamic = "force-dynamic";

const leaveInfoService = Container.get(LeaveInfoService);

const LeaveInfo = async () => {
  const leaveInfos = await leaveInfoService.getAllLeaveInfo();
  const leaveInfosByUser = await leaveInfoService.getAllLeaveInfoByUser();
  const leaveInfoById = await leaveInfoService.getOneLeaveInfoById();
  const session = await leaveInfoService.getOneSessionByUser();
  const createOneSession = async (formData: FormData) => {
    "use server";
    const user_id = formData.get("user_id");
    const start_date = formData.get("start_date");
    const data = {
      body: {
        user_id,
        start_date,
      },
    };
    leaveInfoService.createOneSession(data);
  };
  const deleteOneSession = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    const data = {
      id,
    };
    leaveInfoService.deleteOneSession(data);
  };

  return (
    <div>
      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Create One Leave Session
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={createOneSession}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="user_id"
          placeholder="user_id"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="start_date"
          placeholder="start_date"
        />

        <input
          className="btn btn-sm btn-success"
          type="submit"
          value="create"
        />
      </form>
      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Delete One Leave Session
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={deleteOneSession}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="id"
          placeholder="id"
        />

        <input className="btn btn-sm btn-error" type="submit" value="delete" />
      </form>
      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Session
      </span>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Leave Infos By Id
      </span>
      <pre>{JSON.stringify(leaveInfoById, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Leave Infos By User Id [c80d1b56-3827-4d30-8777-70fccca45fc0]
      </span>
      <pre>{JSON.stringify(leaveInfosByUser, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        All Leave Infos
      </span>
      <pre>{JSON.stringify(leaveInfos, null, 2)}</pre>
    </div>
  );
};

export default LeaveInfo;

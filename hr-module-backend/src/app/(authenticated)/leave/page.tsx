import { LeaveApplicationService } from "@/services/Leave/LeaveApplicationService";
import { LeaveService } from "@/services/Leave/LeaveService";

import Container from "typedi";

export const dynamic = "force-dynamic";

const leaveApplicationService = Container.get(LeaveApplicationService);

const Leave = async () => {
  const leaveApplications =
    await leaveApplicationService.getAllLeaveApplications();
  const remainingLeave =
    await leaveApplicationService.remainingLeaveByUserAndSession();
  const oneApplicationById =
    await leaveApplicationService.findOneApplicationById();
  const createApplication = async (formData: FormData) => {
    "use server";
    const reason = formData.get("reason");
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const number_of_working_days = formData.get("number_of_working_days");
    const leave_type_id = formData.get("leave_type_id");
    const data = {
      body: {
        reason,
        request_date: new Date(),
        start_date,
        end_date,
        num_of_working_days: number_of_working_days,
        leave_type_id,
      },
      user_id: "c80d1b56-3827-4d30-8777-70fccca45fc0",
    };
    leaveApplicationService.createApplication(data);
  };
  const updateApplication = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    const reason = formData.get("reason");
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const number_of_working_days = formData.get("number_of_working_days");
    const leave_type_id = formData.get("leave_type_id");
    const status = formData.get("status");
    const data = {
      id,
      body: {
        reason,
        request_date: new Date(),
        start_date,
        end_date,
        num_of_working_days: number_of_working_days,
        leave_type_id,
        status,
      },
      user_id: "c80d1b56-3827-4d30-8777-70fccca45fc0",
    };
    leaveApplicationService.updateApplication(data);
  };

  const updateApplicationStatus = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    const status = formData.get("status");
    const data = {
      id,
      body: {
        status,
      },
      user_id: "c80d1b56-3827-4d30-8777-70fccca45fc0",
    };
    leaveApplicationService.updateApplicationStatus(data);
  };
  const deleteApplication = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    const data = {
      id,
    };
    leaveApplicationService.deleteApplication(data);
  };

  return (
    <div>
      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Get One Application By Id
      </span>
      <pre>{JSON.stringify(oneApplicationById, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        All Leave Applications
      </span>
      <pre>{JSON.stringify(leaveApplications, null, 2)}</pre>
      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Remaining Leaves
      </span>
      <pre>{JSON.stringify(remainingLeave, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Create Application
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={createApplication}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="reason"
          placeholder="reason"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="start_date"
          placeholder="start_date"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="end_date"
          placeholder="end_date"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="number_of_working_days"
          placeholder="number_of_working_days"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="leave_type_id"
          placeholder="leave_type_id"
        />

        <input
          className="btn btn-sm btn-success"
          type="submit"
          value="create"
        />
      </form>

      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Update Application
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={updateApplication}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="id"
          placeholder="id"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="reason"
          placeholder="reason"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="start_date"
          placeholder="start_date"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="end_date"
          placeholder="end_date"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="number_of_working_days"
          placeholder="number_of_working_days"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="leave_type_id"
          placeholder="leave_type_id"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="status"
          placeholder="status"
        />

        <input
          className="btn btn-sm btn-warning"
          type="submit"
          value="update"
        />
      </form>

      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Update Application Status
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={updateApplicationStatus}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="id"
          placeholder="id"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="status"
          placeholder="status"
        />

        <input
          className="btn btn-sm btn-warning"
          type="submit"
          value="update status"
        />
      </form>

      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Update Application Status
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={deleteApplication}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="id"
          placeholder="id"
        />
        <input
          className="btn btn-sm btn-error"
          type="submit"
          value="Delete Application"
        />
      </form>
    </div>
  );
};

export default Leave;

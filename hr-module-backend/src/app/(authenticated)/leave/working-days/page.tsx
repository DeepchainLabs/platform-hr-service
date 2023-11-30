import { LeaveService } from "@/services/Leave/LeaveService";
import { WorkingDaysService } from "@/services/Leave/WorkingDaysService";

import Container from "typedi";

export const dynamic = "force-dynamic";

const workingDaysService = Container.get(WorkingDaysService);

const WorkingDays = async () => {
  const workingDays = await workingDaysService.getWorkingDays();

  const createWorkingDay = async (formData: FormData) => {
    "use server";
    const from = formData.get("from");
    const to = formData.get("to");
    const data = {
      body: {
        from,
        to,
      },
    };
    workingDaysService.createWorkingDay(data);
  };

  const updateWorkingDay = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    const from = formData.get("from");
    const to = formData.get("to");
    const data = {
      id,
      body: {
        from,
        to,
      },
    };
    workingDaysService.updateWorkingDay(data);
  };

  return (
    <div>
      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Working Days
      </span>
      <pre>{JSON.stringify(workingDays, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Create Company Working Day
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={createWorkingDay}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="from"
          placeholder="from"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="to"
          placeholder="to"
        />

        <input
          className="btn btn-sm btn-success"
          type="submit"
          value="create"
        />
      </form>

      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Update Company Working Day
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={updateWorkingDay}
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
          name="from"
          placeholder="from"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="to"
          placeholder="to"
        />

        <input
          className="btn btn-sm btn-warning"
          type="submit"
          value="update"
        />
      </form>
    </div>
  );
};

export default WorkingDays;

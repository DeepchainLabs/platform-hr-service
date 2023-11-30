import { LeaveService } from "@/services/Leave/LeaveService";

import Container from "typedi";

export const dynamic = "force-dynamic";

const leaveService = Container.get(LeaveService);

const Leave = async () => {
  const getAllApplicationType = await leaveService.getAllLeaveApplicationType();
  const getAllApplicationTypeActiveInactive =
    await leaveService.getAllLeaveApplicationTypeActiveInactive();
  const getOneLeaveApplicationType =
    await leaveService.getOneLeaveApplicationType();
  const createOneLeaveApplicationType = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    const description = formData.get("description");
    const num_of_days_allowed = formData.get("num_of_days_allowed");
    const data = {
      body: {
        title,
        description,
        num_of_days_allowed,
      },
    };
    leaveService.createOneLeaveApplicationType(data);
  };

  const updateOneLeaveApplicationType = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const num_of_days_allowed = formData.get("num_of_days_allowed");
    const data = {
      id,
      body: {
        title,
        description,
        num_of_days_allowed,
      },
    };
    leaveService.updateOneLeaveApplicationType(data);
  };
  const deleteOneLeaveApplicationType = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    const data = {
      id,
    };
    leaveService.deleteOneLeaveApplicationType(data);
  };

  return (
    <div>
      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        All Applications Type
      </span>
      <pre>{JSON.stringify(getAllApplicationType, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        All Applications Type Active-Inactive
      </span>
      <pre>{JSON.stringify(getAllApplicationTypeActiveInactive, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Get One leave application type
      </span>
      <pre>{JSON.stringify(getOneLeaveApplicationType, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Create Leave Application Type
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={createOneLeaveApplicationType}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="title"
          placeholder="title"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="description"
          placeholder="description"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="num_of_days_allowed"
          placeholder="num_of_days_allowed"
        />

        <input
          className="btn btn-sm btn-success"
          type="submit"
          value="create"
        />
      </form>

      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Update Leave Application Type
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={updateOneLeaveApplicationType}
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
          name="title"
          placeholder="title"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="description"
          placeholder="description"
        />
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="num_of_days_allowed"
          placeholder="num_of_days_allowed"
        />

        <input
          className="btn btn-sm btn-warning"
          type="submit"
          value="update"
        />
      </form>
      <span className="text-xl font-bold text-red-600 flex p-2">
        {" "}
        Delete Leave Application Type
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={deleteOneLeaveApplicationType}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="id"
          placeholder="id"
        />

        <input className="btn btn-sm btn-error" type="submit" value="delete" />
      </form>
    </div>
  );
};

export default Leave;

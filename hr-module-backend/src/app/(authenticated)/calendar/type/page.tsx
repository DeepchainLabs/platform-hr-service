import { CalendarTypeService } from "@/services/Calendar/CalendarTypeService";
import { LeaveInfoService } from "@/services/Leave/LeaveInfoService";
import { LeaveService } from "@/services/Leave/LeaveService";
import { WorkingDaysService } from "@/services/Leave/WorkingDaysService";

import Container from "typedi";

export const dynamic = "force-dynamic";

const calendarTypeService = Container.get(CalendarTypeService);

const CalendarType = async () => {
  const calendarTypes = await calendarTypeService.getAllCalendarTypes();
  const createCalendarType = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    const data = {
      body: {
        title,
      },
    };
    calendarTypeService.createCalendarType(data);
  };

  return (
    <div>
      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Create Calendar Type
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={createCalendarType}
      >
        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="title"
          placeholder="title"
        />

        <input
          className="btn btn-sm btn-success"
          type="submit"
          value="create"
        />
      </form>

      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Calendar Types
      </span>
      <pre>{JSON.stringify(calendarTypes, null, 2)}</pre>
    </div>
  );
};

export default CalendarType;

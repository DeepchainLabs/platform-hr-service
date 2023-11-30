import { CalendarService } from "@/services/Calendar/CalendarService";

import Container from "typedi";

export const dynamic = "force-dynamic";

const calendarService = Container.get(CalendarService);

const Calendar = async () => {
  const calendars = await calendarService.getAllCalendars();
  const calendar = await calendarService.getOneCalendar();
  const events = await calendarService.getUpcomingEvents();
  const createCalendar = async (formData: FormData) => {
    "use server";
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const title = formData.get("title");
    const description = formData.get("description");
    const notice = formData.get("notice");
    const type = formData.get("type_id");
    const color = formData.get("color");
    const data = {
      body: {
        start_date,
        end_date,
        title,
        description,
        notice,
        type,
        color,
      },
    };
    console.log(data);
    calendarService.createCalendar(data);
  };

  const updateCalendar = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const title = formData.get("title");
    const description = formData.get("description");
    const notice = formData.get("notice");
    const type = formData.get("type_id");
    const color = formData.get("color");
    const data = {
      id,
      body: {
        start_date,
        end_date,
        title,
        description,
        notice,
        type,
        color,
      },
    };
    console.log(data);
    calendarService.updateCalendar(data);
  };

  const deleteCalendar = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    const data = {
      id,
    };
    console.log(data);
    calendarService.deleteCalendar(data);
  };
  return (
    <div>
      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Create Calendar
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={createCalendar}
      >
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
          name="notice"
          placeholder="notice"
        />

        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="type_id"
          placeholder="type_id"
        />

        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="color"
          placeholder="color"
        />

        <input
          className="btn btn-sm btn-success"
          type="submit"
          value="create"
        />
      </form>

      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Update Calendar
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={updateCalendar}
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
          name="notice"
          placeholder="notice"
        />

        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="type_id"
          placeholder="type_id"
        />

        <input
          className="input input-bordered w-full p-1"
          type="text"
          name="color"
          placeholder="color"
        />

        <input
          className="btn btn-sm btn-warning"
          type="submit"
          value="Update"
        />
      </form>
      <span className="text-xl font-bold text-blue-600 flex p-2">
        {" "}
        Delete Calendar
      </span>
      <form
        className="flex flex-col gap-3 mt-1 w-96 p-3"
        action={deleteCalendar}
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
        Calendars
      </span>
      <pre>{JSON.stringify(calendars, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Calendar By Id
      </span>
      <pre>{JSON.stringify(calendar, null, 2)}</pre>

      <span className="text-xl font-bold text-blue-600 flex justify-center ">
        {" "}
        Upcoming Events
      </span>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </div>
  );
};

export default Calendar;

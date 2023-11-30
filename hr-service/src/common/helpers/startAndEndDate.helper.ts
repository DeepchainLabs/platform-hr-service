import * as moment from "moment";
import { CustomException } from "../exceptions/custom.exception";

export const getStartAndEndDateForCurrentTime = (
  workingPeriod: number,
): { start: Date; end: Date } => {
  try {
    let start: Date;
    const end: Date = moment().toDate();
    // let momentDate : moment.Moment = momentTimeZone.tz("Asia/Dhaka");
    const d = new Date();

    // momentTimeZone.tz(presenceUpdate?.createdAt, "Asia/Dhaka")

    if (moment(d).hour() < workingPeriod) {
      start = moment(d)
        .subtract(1, "days")
        .startOf("day")
        .add(workingPeriod, "hours")
        .toDate();
    } else {
      start = moment(d).startOf("day").add(workingPeriod, "hours").toDate();
    }
    return { start, end };
  } catch (error) {
    throw new CustomException(
      "StartAndEndDate.helper.ts",
      "getStartAndEndDateForCurrentTime",
      error,
    );
  }
};

export const getStartAndEndDate = (
  date: Date,
  workingPeriod: number,
): { start: Date; end: Date } => {
  try {
    const d = moment(date, "YYYY-MM-DD").toDate();
    const start = moment(d).startOf("day").add(workingPeriod, "hours").toDate();
    const end = moment(d).endOf("day").add(workingPeriod, "hours").toDate();
    return { start, end };
  } catch (error) {
    throw new CustomException(
      "StartAndEndDate.helper.ts",
      "getStartAndEndDate",
      error,
    );
  }
};

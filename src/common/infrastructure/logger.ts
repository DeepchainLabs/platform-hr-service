import log4js, { getLogger, levels } from "log4js";
import * as moment from "moment";
export const log4jsConfiguration: log4js.Configuration = {
  appenders: {
    out: { type: "stdout" },
    console: { type: "console" },
    app: {
      type: "file",
      filename: "./logs/" + moment().format("DD-MM-YYYY_HH:MM:SS") + ".log",
    },
  },
  categories: {
    default: { appenders: ["app", "out"], level: "error" },
    file: { appenders: ["app"], level: "DEBUG" },
    console: { appenders: ["out"], level: "ERROR" },
  },
};

export class Logger {
  public static log(message: string, ...data: any[]) {
    const logger = getLogger("default");
    logger.level = levels.DEBUG;
    logger.info(message, ...data);
  }

  public static error(message: string, ...data: any[]) {
    const logger = getLogger("default");
    logger.level = levels.ERROR;
    logger.error(message, ...data);
  }

  public static warning(origin: string, message: string, ...data: any[]) {
    const logger = getLogger(origin);
    logger.level = levels.WARN;
    logger.warn(message, ...data);
  }

  public static file(message: string, ...data: any[]) {
    const logger = getLogger("file");
    logger.level = levels.DEBUG;
    logger.debug(message, ...data);
  }

  public static console(message: string, ...data: any[]) {
    const logger = getLogger("console");
    logger.level = levels.ERROR;
    logger.error(message, ...data);
  }

  public static fileBasicInfo(message: string, ...data: any[]) {
    const logger = getLogger("file");
    logger.level = levels.INFO;
    logger.info(message, ...data);
  }

  public static consoleBasicInfo(message: string, ...data: any[]) {
    const logger = getLogger("console");
    logger.level = levels.INFO;
    logger.info(message, ...data);
  }

  public static fileBasicError(message: string, ...data: any[]) {
    const logger = getLogger("file");
    logger.level = levels.ERROR;
    logger.error(message, ...data);
  }

  public static consoleBasicError(message: string, ...data: any[]) {
    const logger = getLogger("console");
    logger.level = levels.ERROR;
    logger.error(message, ...data);
  }

  public static generalLog(message: string, ...data: any[]) {
    const logger = getLogger("default");
    logger.level = levels.ERROR;
    logger.error(message, ...data);
  }
}

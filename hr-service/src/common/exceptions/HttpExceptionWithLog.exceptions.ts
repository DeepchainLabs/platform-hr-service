import { HttpException } from "@nestjs/common";
import { Logger } from "../infrastructure/logger";

export class HttpExceptionWithLog extends HttpException {
  constructor(
    message: string,
    status: any,
    className: string,
    methodName: string,
  ) {
    Logger.error(`ClassName: ${className} - ${methodName}`, "Error", message);
    super(message, status);
  }
}

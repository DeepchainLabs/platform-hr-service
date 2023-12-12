import { Logger } from "../infrastructure/logger";

export const logInfo = (className: any, methodName: any) => {
  Logger.fileBasicInfo("Basic - ", className, methodName);
  Logger.consoleBasicInfo("Basic - ", className, methodName);
};

export const logError = (className: any, methodName: any) => {
  Logger.fileBasicError("Basic - ", className, methodName);
  Logger.consoleBasicError("Basic - ", className, methodName);
};

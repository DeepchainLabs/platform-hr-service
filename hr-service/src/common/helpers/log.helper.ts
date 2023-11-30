import { Logger } from "../infrastructure/logger";

export const logInConsoleAndFile = (
  className: string,
  methodName: string,
  error: any,
  customMessage?: string,
) => {
  const message = error?.response?.message ?? error?.message;
  const modifiedMsg = customMessage ? customMessage : message;

  Logger.file(`ClassName: ${className} - ${methodName}`, "Error", {
    errorMsg: error?.message,
    customMessage,
    error,
  });
  Logger.console(`ClassName: ${className} - ${methodName}`, "Error", {
    modifiedMsg,
    customMessage,
  });
};

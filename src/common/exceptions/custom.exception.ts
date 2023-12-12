import { HttpException } from '@nestjs/common';import { Logger } from '../infrastructure/logger';

export class CustomException extends HttpException {
    constructor(
        className: string,
        methodName: string,
        error: any,
        customMessage?: string,
        statusCode?: number,
    ) {
        let status: number;
        if (error?.response?.status) status = error?.response?.status;
        else if (statusCode) status = statusCode;
        else if (error?.status) status = error?.status;
        else status = 403;

        const message = error?.response?.message ?? error?.message;
        const modifiedMsg = customMessage ? customMessage : message;

        Logger.error(`ClassName: ${className} - ${methodName}`, 'Error', {
            message,
            customMessage,
            error,
        });
        super(modifiedMsg, status);
    }
}

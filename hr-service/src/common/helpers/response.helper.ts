import { IReturnType } from '../interfaces/return-type.interface';

export class ResponseHelperCommon {
    public static getModifiedResponse(
        { success = true, message = '', data = {} },
    ): IReturnType {
        return {
            success,
            message,
            data,
        };
    }
}

export const getModifiedResponse = ResponseHelperCommon.getModifiedResponse;

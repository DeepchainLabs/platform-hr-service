import { IPaginateResponse } from './paginate-response.interface';

interface IReturnType {
    success?: boolean;
    status?: boolean;
    message?: string;
    data?: any;
    meta?: any
}

export { IReturnType };

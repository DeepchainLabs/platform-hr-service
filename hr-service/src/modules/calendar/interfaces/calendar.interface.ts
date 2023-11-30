export interface ICalendar {
    id?: string;
    start_date?: Date;
    end_date?: Date;
    title?: string;
    description?: string;
    notice?: string;
    type?: string;
    color?: string;
    status?: string;
    is_active?: boolean;
    created_by?: string;
    updated_by?: string;
    deleted_by?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

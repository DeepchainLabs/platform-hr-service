export interface ILeaveCategory {
  id?: string;
  title?: string;
  description?: string;
  num_of_days_allowed?: number;
  status?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

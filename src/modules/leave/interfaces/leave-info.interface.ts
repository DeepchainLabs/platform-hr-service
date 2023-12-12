export interface ILeaveInfo {
  id?: string;
  user_id?: string;
  session?: string;
  start_date?: Date | string;
  end_date?: Date | string;
  status?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  // relations
  userProfile?: any;
  user?: any;
}

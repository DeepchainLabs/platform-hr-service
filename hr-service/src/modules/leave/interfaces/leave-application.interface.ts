import { LeaveType } from "../entities/leave-type.entity";

export interface ILeaveApplication {
  id?: string;
  applied_for?: string;
  applied_by?: string;
  approved_by?: string;
  session_id?: string;
  reason?: string;
  request_date?: Date;
  start_date?: Date;
  end_date?: Date;
  approval_date?: Date;
  num_of_working_days?: number;
  remarks?: string;
  leave_type_id?: string;
  status?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  // relations
  appliedUserProfile?: any;
  approvedUserProfile?: any;
  appliedUser?: any;
  approvedUser?: any;
  type?: LeaveType;
}

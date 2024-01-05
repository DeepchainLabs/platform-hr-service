import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("leave_applications")
export class LeaveApplicationFactory {
  @PrimaryColumn()
  id?: string;

  @Column()
  category_id?: string;

  @Column()
  applied_for?: string;

  @Column()
  applied_by?: string;

  @Column({
    nullable: true,
  })
  approved_by?: string;

  @Column()
  session_id?: string;

  @Column()
  reason?: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  request_date?: Date;

  @Column({
    type: "date",
  })
  start_date?: Date;

  @Column({
    type: "date",
  })
  end_date?: Date;

  @Column({
    type: "date",
  })
  approval_date?: Date;

  @Column()
  num_of_working_days?: number;

  @Column({
    nullable: true,
  })
  remarks?: string;

  @Column()
  leave_type_id?: string;

  @Column({
    default: "Not Approved",
  })
  status?: string;

  @Column()
  is_active?: boolean;

  @Column()
  created_by?: string;

  @Column()
  updated_by?: string;

  @Column()
  deleted_by?: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

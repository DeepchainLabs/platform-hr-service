import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { LeaveType } from "./leave-type.entity";
import { LeaveAttachment } from "./leave-attachment.entity";
import { LeaveCategory } from "./leave-category.entity";

@Entity("leave_applications")
export class LeaveApplication {
  constructor() {
    this.applied_for = "";
    this.num_of_working_days = 0;
  }
  @PrimaryGeneratedColumn("uuid")
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

  // relations
  // @ManyToOne(() => Profile)
  // @JoinColumn({ name: 'applied_by', referencedColumnName: 'user_id' })
  // appliedUserProfile?: Profile;

  // @ManyToOne(() => Profile)
  // @JoinColumn({ name: 'approved_by', referencedColumnName: 'user_id' })
  // approvedUserProfile?: Profile;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'applied_by', referencedColumnName: 'id' })
  // appliedUser?: User;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'applied_by', referencedColumnName: 'id' })
  // approvedUser?: User;

  @ManyToOne(() => LeaveCategory)
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category?: LeaveCategory;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: "leave_type_id", referencedColumnName: "id" })
  type?: LeaveType;

  @OneToMany(() => LeaveAttachment, (map) => map.application)
  @JoinColumn({ name: "id", referencedColumnName: "application_id" })
  attachments?: LeaveAttachment[];
}

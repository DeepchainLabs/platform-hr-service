import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { LeaveType } from "./leave-type.entity";
import { LeaveApplication } from "./leave-application.entity";

@Entity("leave_categories")
export class LeaveCategory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title?: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @Column()
  num_of_days_allowed?: number;

  @Column()
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
  @OneToMany(() => LeaveType, (type) => type.category)
  @JoinColumn({ name: "id", referencedColumnName: "category_id" })
  types?: LeaveType[];

  @OneToMany(() => LeaveApplication, (type) => type.category)
  @JoinColumn({ name: "id", referencedColumnName: "category_id" })
  application?: LeaveApplication[];
}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { LeaveApplication } from "./leave-application.entity";
import { LeaveCategory } from "./leave-category.entity";

@Entity("leave_types")
export class LeaveType {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  category_id?: string;

  @Column()
  title?: string;

  @Column({
    nullable: true,
  })
  description?: string;

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
  @ManyToOne(() => LeaveCategory)
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category?: LeaveCategory;

  @OneToMany(() => LeaveApplication, (map) => map.type)
  @JoinColumn({ name: "id", referencedColumnName: "leave_type_id" })
  applications?: LeaveApplication[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { LeaveType } from "./leave-type.entity";

/**
 * TODO refactor code
 * ! should be info => session_info
 */
@Entity("session_infos")
export class LeaveInfo {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  user_id?: string;

  @Column()
  session?: string;

  @Column()
  start_date?: Date;

  @Column()
  end_date?: Date;

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

  //relationship
  // @ManyToOne(() => Profile)
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  // userProfile?: Profile;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  // user?: User;

  @ManyToMany(() => LeaveType)
  @JoinTable({
    name: "leave_info_type_maps",
    joinColumn: { name: "leave_info_id", referencedColumnName: "id" },
    inverseJoinColumn: {
      name: "leave_type_id",
      referencedColumnName: "id",
    },
  })
  leave_types?: LeaveType[];
}

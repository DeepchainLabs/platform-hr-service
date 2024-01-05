import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("leave_application_attachments")
export class LeaveApplicationAttachmentFactory {
  @PrimaryColumn()
  id?: string;

  @Column()
  application_id?: string;

  @Column({
    nullable: true,
  })
  display_name?: string;

  @Column()
  file_path?: string;

  @Column()
  size?: number;

  @Column()
  type?: string;

  @Column()
  storage_type?: string;

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

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("calendars")
export class CalendarFactory {
  @PrimaryColumn()
  id?: string;

  @Column()
  start_date?: Date;

  @Column()
  end_date?: Date;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @Column()
  notice?: string;

  @Column()
  type?: string;

  @Column()
  color?: string;

  // @Column()
  // assigned_by?: string;

  @Column()
  status?: string;

  @Column()
  is_active?: boolean;

  @Column()
  created_by?: string;

  @Column({
    nullable: true,
  })
  updated_by?: string;

  @Column({
    nullable: true,
  })
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

  @DeleteDateColumn({
    nullable: true,
  })
  deleted_at?: Date;
}

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { LeaveApplication } from './leave-application.entity';

@Entity('leave_application_attachments')
export class LeaveAttachment {
    @PrimaryGeneratedColumn('uuid')
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
    is_active?: boolean;

    @Column()
    created_by?: string;

    @Column()
    updated_by?: string;

    @Column()
    deleted_by?: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at?: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

    @ManyToOne(() => LeaveApplication)
    @JoinColumn({ name: 'application_id', referencedColumnName: 'id' })
    application?: LeaveApplication;
}

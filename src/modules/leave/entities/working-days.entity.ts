import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { LeaveApplication } from './leave-application.entity';

@Entity('working_days')
export class WorkingDays {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    from?: string;

    @Column()
    to?: string;

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
}

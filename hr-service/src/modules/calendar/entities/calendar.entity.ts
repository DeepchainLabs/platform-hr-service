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
import { CalendarType } from './calendar-type.entity';

@Entity('calendars')
export class Calendar {
    @PrimaryGeneratedColumn('uuid')
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

    @DeleteDateColumn({
        nullable: true,
    })
    deleted_at?: Date;

    @ManyToOne(() => CalendarType)
    @JoinColumn({ name: 'type', referencedColumnName: 'id' })
    calendarType?: CalendarType;
}

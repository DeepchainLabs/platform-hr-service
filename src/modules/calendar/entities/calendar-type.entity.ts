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
import { Calendar } from './calendar.entity';
import { Field } from 'type-graphql';

@Entity('calendar_types')
export class CalendarType {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    title?: string;

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

    @OneToMany(() => Calendar, (calendar) => calendar.calendarType)
    @JoinColumn({ name: 'id', referencedColumnName: 'type' })
    @Field(() => [Calendar], { nullable: true })
    types?: Calendar[];
}

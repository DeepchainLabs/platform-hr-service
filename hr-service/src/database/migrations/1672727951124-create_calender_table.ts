import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class createCalendarTable1672727951124 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'calendars',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'start_date',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'end_date',
                        type: 'date',
                        isNullable: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'notice',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'year',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        isNullable: true,
                        default: true,
                    },
                    {
                        name: 'created_by',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'updated_by',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'deleted_by',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP(6)',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP(6)',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            })
        );
        // clear sqls in memory to avoid removing tables when down queries executed.
        queryRunner.clearSqlMemory();

        const foreignKey = new TableForeignKey({
            columnNames: ['type'],
            referencedColumnNames: ['id'],
            referencedTableName: 'calendar_types',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('calendars', foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('calendars', true);
    }
}

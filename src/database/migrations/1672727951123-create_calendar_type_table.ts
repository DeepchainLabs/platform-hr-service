import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCalendarTypeTable1672727951123
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'calendar_types',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isUnique: true,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('calendar_types', true);
    }
}

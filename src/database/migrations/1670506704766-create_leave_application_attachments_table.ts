import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class createLeaveApplicationAttachmentsTable1670506704766
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'leave_application_attachments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'application_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'display_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'file_path',
                        type: 'varchar',
                        isNullable: false,
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

        queryRunner.clearSqlMemory();

        const foreignKeyUserApplication = new TableForeignKey({
            columnNames: ['application_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'leave_applications',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey(
            'leave_application_attachments',
            foreignKeyUserApplication
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('leave_application_attachments', true);
    }
}

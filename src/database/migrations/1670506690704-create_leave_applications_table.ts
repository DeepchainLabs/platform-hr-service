import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createLeaveApplicationsTable1670506690704
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "leave_applications",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "applied_for",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "applied_by",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "approved_by",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "session_id",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "reason",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "request_date",
            type: "timestamp",
            isNullable: true,
            default: "CURRENT_TIMESTAMP(6)",
          },
          {
            name: "start_date",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "end_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "approval_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "num_of_working_days",
            type: "integer",
            isNullable: true,
          },
          {
            name: "remarks",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "category_id",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "leave_type_id",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            isNullable: true,
            default: true,
          },
          {
            name: "created_by",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "updated_by",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "deleted_by",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: true,
            default: "CURRENT_TIMESTAMP(6)",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
            default: "CURRENT_TIMESTAMP(6)",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
    );
    // clear sqls in memory to avoid removing tables when down queries executed.
    queryRunner.clearSqlMemory();

    // const foreignKeyAppliedBy = new TableForeignKey({
    //     columnNames: ['applied_by'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'users',
    //     onDelete: 'CASCADE',
    // });

    // const foreignKeyAppliedFor = new TableForeignKey({
    //     columnNames: ['applied_for'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'users',
    //     onDelete: 'CASCADE',
    // });

    const foreignKeyLeaveType = new TableForeignKey({
      columnNames: ["leave_type_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "leave_types",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKeys("leave_applications", [
      foreignKeyLeaveType,
      // foreignKeyAppliedBy,
      // foreignKeyAppliedFor,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("leave_applications", true);
  }
}

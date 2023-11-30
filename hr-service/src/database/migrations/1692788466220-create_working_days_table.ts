import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createWorkingDaysTable1692788466220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "working_days",
        columns: [
          {
            name: "id",
            type: "varchar",
            isUnique: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "from",
            type: "varchar",
            isNullable: false,
          },

          {
            name: "to",
            type: "varchar",
            isNullable: false,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("working_days", true);
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createSessionInfosTable1670506690703
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "session_infos",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            /**
             * TODO refactor
             * ? questions
             * ? can session info be unique ?
             */
            name: "session",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "start_date",
            type: "date",
            isNullable: false,
          },
          {
            name: "end_date",
            type: "date",
            isNullable: false,
          },
          {
            name: "user_id",
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

    // const foreignKeyUser = new TableForeignKey({
    //     columnNames: ['user_id'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'users',
    //     onDelete: 'CASCADE',
    // });
    // await queryRunner.createForeignKey('session_infos', foreignKeyUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("session_infos", true);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBuildings1715075422323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS buildings (
    id INT PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(255)
);
`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE buildings`);
  }
}

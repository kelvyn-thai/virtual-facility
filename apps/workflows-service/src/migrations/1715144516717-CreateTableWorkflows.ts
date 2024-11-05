import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableWorkflows1715144516717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS workflows (
        id INT PRIMARY KEY NOT NULL,
        name VARCHAR(255),
        buildingId INT NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS workflows;
    `);
  }
}

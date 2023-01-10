import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArticleMigration1672846246319 implements MigrationInterface {
  name = 'ArticleMigration1672846246319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "tagList" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "favouritesCount" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" DROP COLUMN "favouritesCount"`,
    );
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "tagList"`);
  }
}

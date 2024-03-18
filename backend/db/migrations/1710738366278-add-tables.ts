import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1710738366278 implements MigrationInterface {
    name = 'AddTables1710738366278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "problem_setup" ("problemId" integer NOT NULL, "languageId" integer NOT NULL, "code" text NOT NULL, CONSTRAINT "PK_2c686e3ca4d68b5d8b3f725abba" PRIMARY KEY ("problemId", "languageId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "problem_setup"`);
    }

}

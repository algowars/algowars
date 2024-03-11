import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupTables1710019113205 implements MigrationInterface {
    name = 'SetupTables1710019113205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "submission_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "submissionId" integer, CONSTRAINT "UQ_d1719c9d39b1e456090f553c93f" UNIQUE ("token"), CONSTRAINT "PK_0a9c3de1df4162012902eb10ceb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "submission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "problemId" integer, "createdById" integer, CONSTRAINT "PK_7faa571d0e4a7076e85890c9bd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "sub" character varying NOT NULL, "username" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e00e2a4457c3bd3193a16404b3f" UNIQUE ("sub"), CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_input" ("id" SERIAL NOT NULL, "label" character varying(50) NOT NULL, "input" character varying NOT NULL, "testId" integer, CONSTRAINT "PK_6149e79d547fe2e3bfa07c0e680" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_setup" ("id" SERIAL NOT NULL, "header" character varying NOT NULL, CONSTRAINT "PK_ac4edef8cd2e33b30e61a180c99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test" ("id" SERIAL NOT NULL, "expectedOutput" character varying NOT NULL, "test" character varying NOT NULL, "problemId" integer, "setupId" integer, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "problem" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "question" character varying(750) NOT NULL, "slug" character varying(110) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdById" integer, CONSTRAINT "UQ_3110f85e6771148af0754eae10f" UNIQUE ("slug"), CONSTRAINT "PK_119b5ca6f3371465bf1f0f90219" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "submission_token" ADD CONSTRAINT "FK_3a36c2d85af79c23a059b9e0522" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_3182d5e825aa9dee60559030d49" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_bee022f639ff5b298975dfaa37b" FOREIGN KEY ("createdById") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_input" ADD CONSTRAINT "FK_7ffcd7cbb182e2f139503c1bd31" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_50dc3a3544a8ee4c1ffde29ee67" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_2e19c3a337ac373452a0ce3a4e6" FOREIGN KEY ("setupId") REFERENCES "test_setup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "problem" ADD CONSTRAINT "FK_3e3f4232a088f493bec92360ace" FOREIGN KEY ("createdById") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "problem" DROP CONSTRAINT "FK_3e3f4232a088f493bec92360ace"`);
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_2e19c3a337ac373452a0ce3a4e6"`);
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_50dc3a3544a8ee4c1ffde29ee67"`);
        await queryRunner.query(`ALTER TABLE "test_input" DROP CONSTRAINT "FK_7ffcd7cbb182e2f139503c1bd31"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_bee022f639ff5b298975dfaa37b"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_3182d5e825aa9dee60559030d49"`);
        await queryRunner.query(`ALTER TABLE "submission_token" DROP CONSTRAINT "FK_3a36c2d85af79c23a059b9e0522"`);
        await queryRunner.query(`DROP TABLE "problem"`);
        await queryRunner.query(`DROP TABLE "test"`);
        await queryRunner.query(`DROP TABLE "test_setup"`);
        await queryRunner.query(`DROP TABLE "test_input"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "submission"`);
        await queryRunner.query(`DROP TABLE "submission_token"`);
    }

}

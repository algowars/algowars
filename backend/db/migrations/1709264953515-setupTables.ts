import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupTables1709264953515 implements MigrationInterface {
    name = 'SetupTables1709264953515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "problem_test" ("id" SERIAL NOT NULL, "test" character varying NOT NULL, "order" integer NOT NULL, "problemSetupProblemId" integer, "problemSetupLanguageId" integer, CONSTRAINT "PK_010ec27a3e22f82c5ac7f43ad68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "problem_setup" ("problemId" integer NOT NULL, "languageId" integer NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_2c686e3ca4d68b5d8b3f725abba" PRIMARY KEY ("problemId", "languageId"))`);
        await queryRunner.query(`CREATE TABLE "problem_input" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, "input" character varying NOT NULL, "problemSetupProblemId" integer, "problemSetupLanguageId" integer, CONSTRAINT "PK_a97a32912109ad5cdf8b16a82d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "problem_initial_inputs" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, "input" character varying NOT NULL, CONSTRAINT "UQ_49ec17009d3cd0e72165bb79fbf" UNIQUE ("input"), CONSTRAINT "PK_7b0874548de4bfbdf90276fbf7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language_setup" ("languageId" integer NOT NULL, "setup" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6066253f530917a34f2e462c576" PRIMARY KEY ("languageId"))`);
        await queryRunner.query(`CREATE TABLE "problem_solution" ("languageId" integer NOT NULL, "problemId" integer NOT NULL, "solution" character varying NOT NULL, CONSTRAINT "PK_5c2695fe9bcfdc954298f8622d0" PRIMARY KEY ("languageId", "problemId"))`);
        await queryRunner.query(`CREATE TABLE "problem" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "question" character varying(750) NOT NULL, "titleSlug" character varying(110) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdById" integer, CONSTRAINT "UQ_40332279dde2ee2ed16d42315b3" UNIQUE ("titleSlug"), CONSTRAINT "PK_119b5ca6f3371465bf1f0f90219" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "sub" character varying NOT NULL, "username" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e00e2a4457c3bd3193a16404b3f" UNIQUE ("sub"), CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "problem_test" ADD CONSTRAINT "FK_b68de780f2ab0e7161deba16176" FOREIGN KEY ("problemSetupProblemId", "problemSetupLanguageId") REFERENCES "problem_setup"("problemId","languageId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "problem_input" ADD CONSTRAINT "FK_e5f3fcd235f112e2ba1f120df90" FOREIGN KEY ("problemSetupProblemId", "problemSetupLanguageId") REFERENCES "problem_setup"("problemId","languageId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "problem" ADD CONSTRAINT "FK_3e3f4232a088f493bec92360ace" FOREIGN KEY ("createdById") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "problem" DROP CONSTRAINT "FK_3e3f4232a088f493bec92360ace"`);
        await queryRunner.query(`ALTER TABLE "problem_input" DROP CONSTRAINT "FK_e5f3fcd235f112e2ba1f120df90"`);
        await queryRunner.query(`ALTER TABLE "problem_test" DROP CONSTRAINT "FK_b68de780f2ab0e7161deba16176"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "problem"`);
        await queryRunner.query(`DROP TABLE "problem_solution"`);
        await queryRunner.query(`DROP TABLE "language_setup"`);
        await queryRunner.query(`DROP TABLE "problem_initial_inputs"`);
        await queryRunner.query(`DROP TABLE "problem_input"`);
        await queryRunner.query(`DROP TABLE "problem_setup"`);
        await queryRunner.query(`DROP TABLE "problem_test"`);
    }

}

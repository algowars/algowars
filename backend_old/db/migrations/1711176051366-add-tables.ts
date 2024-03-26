import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1711176051366 implements MigrationInterface {
    name = 'AddTables1711176051366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player_submission" ("id" SERIAL NOT NULL, "playerId" uuid, CONSTRAINT "PK_ca6527c4fc2206d70137f5031d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lobby" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "creatorId" uuid, CONSTRAINT "PK_0d9e681a820740df03d4ba784bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lobby_status" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, "color" character varying NOT NULL, "lobbiesId" uuid, CONSTRAINT "PK_063ac4dd52aa2dd46388999c9b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ffa_battle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "duration" integer NOT NULL DEFAULT '15', CONSTRAINT "PK_2c97a79a4e91199b0e20cbad217" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lobby_players_player" ("lobbyId" uuid NOT NULL, "playerId" uuid NOT NULL, CONSTRAINT "PK_3166dea1fcf99b5d9a358e56fc4" PRIMARY KEY ("lobbyId", "playerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fbee2b9bd251d9e07609c5ea89" ON "lobby_players_player" ("lobbyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f14c460af87347ed5f0ef854a6" ON "lobby_players_player" ("playerId") `);
        await queryRunner.query(`ALTER TABLE "player_submission" ADD CONSTRAINT "FK_8813eedd70bf5251fc11a1898d1" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lobby" ADD CONSTRAINT "FK_c9d62061273375bd10354262eba" FOREIGN KEY ("creatorId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lobby_status" ADD CONSTRAINT "FK_7a574fd638bb22f2ec77ff78694" FOREIGN KEY ("lobbiesId") REFERENCES "lobby"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lobby_players_player" ADD CONSTRAINT "FK_fbee2b9bd251d9e07609c5ea898" FOREIGN KEY ("lobbyId") REFERENCES "lobby"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lobby_players_player" ADD CONSTRAINT "FK_f14c460af87347ed5f0ef854a69" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lobby_players_player" DROP CONSTRAINT "FK_f14c460af87347ed5f0ef854a69"`);
        await queryRunner.query(`ALTER TABLE "lobby_players_player" DROP CONSTRAINT "FK_fbee2b9bd251d9e07609c5ea898"`);
        await queryRunner.query(`ALTER TABLE "lobby_status" DROP CONSTRAINT "FK_7a574fd638bb22f2ec77ff78694"`);
        await queryRunner.query(`ALTER TABLE "lobby" DROP CONSTRAINT "FK_c9d62061273375bd10354262eba"`);
        await queryRunner.query(`ALTER TABLE "player_submission" DROP CONSTRAINT "FK_8813eedd70bf5251fc11a1898d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f14c460af87347ed5f0ef854a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fbee2b9bd251d9e07609c5ea89"`);
        await queryRunner.query(`DROP TABLE "lobby_players_player"`);
        await queryRunner.query(`DROP TABLE "ffa_battle"`);
        await queryRunner.query(`DROP TABLE "lobby_status"`);
        await queryRunner.query(`DROP TABLE "lobby"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "player_submission"`);
    }

}

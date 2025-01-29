import type { Knex } from 'knex';

enum ProblemRushGameMode {
  SOLO = 'solo',
  DUEL = 'duel',
  FFA = 'ffa',
}

enum ProblemRushStatus {
  PREGAME = 'pregame',
  INGAME = 'ingame',
  GAME_OVER = 'game_over',
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('problem_rush', (table) => {
    table.uuid('id').primary();

    table
      .enu('game_mode', Object.values(ProblemRushGameMode), {
        useNative: true,
        enumName: 'problem_rush_game_mode_enum',
      })
      .notNullable();
    table
      .enu('game_status', Object.values(ProblemRushStatus), {
        useNative: true,
        enumName: 'problem_rush_status_enum',
      })
      .notNullable()
      .defaultTo(ProblemRushStatus.PREGAME);
    table
      .uuid('created_by_id')
      .notNullable()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.dateTime('started_at').nullable().defaultTo(null);
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('problem_rush');
  await knex.raw('DROP TYPE IF EXISTS "problem_rush_status_enum"');
  return knex.raw('DROP TYPE IF EXISTS "problem_rush_game_mode_enum"');
}

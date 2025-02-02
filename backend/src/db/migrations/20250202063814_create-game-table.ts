import type { Knex } from 'knex';

enum GameType {
  RUSH = 'Rush',
  SURVIVAL = 'Survival',
}

enum GameMode {
  SOLO = 'Solo',
  DUEL = 'Duel',
  FFA = 'Free-For-All',
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('games', (table) => {
    table.uuid('id').primary();
    table
      .uuid('created_by_id')
      .nullable()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .uuid('lobby_id')
      .notNullable()
      .references('id')
      .inTable('lobbies')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .enu('game_mode', Object.values(GameMode), {
        useNative: true,
        enumName: 'game_game_mode_enum',
      })
      .notNullable();
    table
      .enu('game_type', Object.values(GameType), {
        useNative: true,
        enumName: 'game_game_type_enum',
      })
      .notNullable();
    table.timestamp('started_at').nullable();
    table.timestamp('finished_at').nullable();
    table.timestamps(true, true);
    table.integer('version').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('games');
  await knex.raw('DROP TYPE IF EXISTS "game_game_mode_enum"');
  return knex.raw('DROP TYPE IF EXISTS "game_game_type_enum"');
}

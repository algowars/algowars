import type { Knex } from 'knex';

enum GameModes {
  STANDARD = 'Standard',
  SOLO = 'Solo',
  DUEL = 'Duel',
  BATTLE = 'Battle',
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('player_elos', (table) => {
    table
      .uuid('player_id')
      .notNullable()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.enu('game_mode', Object.values(GameModes), {
      useNative: true,
      enumName: 'game_mode_enum',
    });
    table.integer('elo').notNullable();
    table.primary(['player_id', 'game_mode']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('player_elos')
    .raw('DROP TYPE IF EXISTS game_mode_enum');
}

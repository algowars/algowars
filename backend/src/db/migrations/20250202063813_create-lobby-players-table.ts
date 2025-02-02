import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('lobby_players', (table) => {
    table.uuid('lobby_id').notNullable();
    table.uuid('account_id').notNullable();
    table.primary(['lobby_id', 'account_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('lobby_players');
}

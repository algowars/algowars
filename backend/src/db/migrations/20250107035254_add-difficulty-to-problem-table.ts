import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('problems', (table) => {
    table.integer('difficulty').notNullable().defaultTo(1200);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('problems', (table) => {
    table.dropColumn('difficulty');
  });
}

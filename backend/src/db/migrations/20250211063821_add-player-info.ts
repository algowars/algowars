import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('accounts', (table) => {
    table.text('picture').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('accounts', (table) => {
    table.dropColumn('picture');
  });
}

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('tests', (table) => {
    table.boolean('is_editable').defaultTo(true).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('tests', (table) => {
    table.dropColumn('is_editable');
  });
}

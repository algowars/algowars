import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('languages', (table) => {
    table.integer('id').primary();
    table.string('name').notNullable().unique();
    table.boolean('is_archived').defaultTo(false);
    table.boolean('is_available').defaultTo(true);
    table.text('initial_code').notNullable();
    table.text('initial_solution').notNullable();
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('languages');
}

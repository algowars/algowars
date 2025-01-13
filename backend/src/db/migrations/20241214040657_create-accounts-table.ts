import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('accounts', (table) => {
    table.uuid('id').primary();
    table.string('sub', 40).notNullable().unique();
    table.string('username', 40).notNullable().unique();
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('accounts');
}

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('additional_test_files', (table) => {
    table.uuid('id').primary();
    table.text('file_name').notNullable();
    table.string('name').notNullable();
    table
      .integer('language_id')
      .notNullable()
      .references('id')
      .inTable('languages')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.text('initial_test_file').notNullable();
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('additional_test_files');
}

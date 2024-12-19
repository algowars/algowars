import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tests', (table) => {
    table.uuid('id').primary();
    table.text('code').notNullable();
    table
      .uuid('problem_id')
      .notNullable()
      .references('id')
      .inTable('problems')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('language_id')
      .notNullable()
      .references('id')
      .inTable('languages')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .uuid('additional_test_file_id')
      .notNullable()
      .references('id')
      .inTable('additional_test_files')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tests');
}

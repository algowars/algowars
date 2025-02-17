import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('test_cases', (table) => {
    table.uuid('id').primary();
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
    table.text('expected_output').notNullable();
    table.text('input').notNullable();
    table.boolean('is_editable').defaultTo(false);
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('test_cases');
}

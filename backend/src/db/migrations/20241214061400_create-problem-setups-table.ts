import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('problem_setups', (table) => {
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
      .uuid('solution_id')
      .notNullable()
      .references('id')
      .inTable('submissions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.text('initial_code').notNullable();
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.increments('version').defaultTo(0);
    table.timestamps(true, true);
    table.primary(['problem_id', 'language_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('problem_setups');
}

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('problem_rush_problems', (table) => {
    table.uuid('id').primary();
    table
      .uuid('problem_id')
      .notNullable()
      .references('id')
      .inTable('problems')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .uuid('problem_rush_id')
      .notNullable()
      .references('id')
      .inTable('problem_rush')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('position').notNullable();
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('problem_rush_problems');
}

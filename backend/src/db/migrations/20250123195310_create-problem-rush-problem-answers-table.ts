import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('problem_rush_problem_answers', (table) => {
    table.uuid('id').unique();
    table
      .uuid('submission_id')
      .nullable()
      .references('id')
      .inTable('submissions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('position').notNullable();
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('problem_rush_problem_answers');
}

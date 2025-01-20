import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('problem_tags', (table) => {
    table
      .uuid('problem_id')
      .notNullable()
      .references('id')
      .inTable('problems')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('tag_id')
      .notNullable()
      .references('id')
      .inTable('tags')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.unique(['problem_id', 'tag_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('problem_tags');
}

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('game_rounds', (table) => {
    table.uuid('id').primary();
    table
      .uuid('game_id')
      .notNullable()
      .references('id')
      .inTable('games')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('game_rounds');
}

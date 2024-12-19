import type { Knex } from 'knex';
import { ProblemStatus } from 'src/problem/domain/problem-status';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('problems', (table) => {
    table.uuid('id').primary();
    table.string('title', 100).notNullable();
    table.text('question').notNullable();
    table.string('slug', 110).notNullable().unique();
    table
      .enu('status', Object.values(ProblemStatus), {
        useNative: true,
        enumName: 'problem_status_enum',
      })
      .notNullable()
      .defaultTo(ProblemStatus.PENDING);
    table
      .uuid('created_by_id')
      .notNullable()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('problems');
  return knex.raw('DROP TYPE IF EXISTS "problem_status_enum"');
}

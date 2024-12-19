import type { Knex } from 'knex';
import { CodeExecutionEngines } from '../../../lib/code-execution/code-execution-engines';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('submissions', (table) => {
    table.uuid('id').primary();
    table.text('source_code').notNullable();
    table
      .integer('language_id')
      .notNullable()
      .references('id')
      .inTable('languages')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .uuid('created_by_id')
      .notNullable()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .enu('code_execution_context', Object.values(CodeExecutionEngines), {
        useNative: true,
        enumName: 'code_execution_context_enum',
      })
      .notNullable()
      .defaultTo(CodeExecutionEngines.JUDGE0);
    table
      .uuid('problem_id')
      .notNullable()
      .references('id')
      .inTable('problems')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.increments('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('submissions');
  return knex.raw('DROP TYPE IF EXISTS "code_execution_context_enum"');
}

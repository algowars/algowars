import type { Knex } from 'knex';
import { SubmissionStatus } from '../../submission/domain/submission-status';
import { TestType } from '../../problem/domain/test-type';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('submission_results', (table) => {
    table.uuid('token').primary();
    table.text('source_code').nullable();
    table.integer('language_id').nullable();
    table.text('stdin').nullable();
    table.text('stdout').nullable();
    table.string('time').nullable();
    table.integer('memory').nullable();
    table.string('stderr').nullable();
    table.text('expected_output').nullable();
    table.text('message').nullable();
    table
      .uuid('submission_id')
      .notNullable()
      .references('id')
      .inTable('submissions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .enu('test_type', Object.values(TestType), {
        useNative: true,
        enumName: 'submission_result_test_type_enum',
      })
      .notNullable();
    table
      .enu('status', Object.values(SubmissionStatus), {
        useNative: true,
        enumName: 'submission_result_status_enum',
      })
      .notNullable()
      .defaultTo(SubmissionStatus.PROCESSING);
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.increments('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('submission_results');
  return knex.raw('DROP TYPE IF EXISTS "submission_result_status_enum"');
}

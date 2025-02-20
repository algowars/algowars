import type { Knex } from 'knex';
import { TestType } from '../../problem/domain/test-type';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tests', (table) => {
    table.uuid('id').primary();
    table.text('code').nullable();
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
      .nullable()
      .references('id')
      .inTable('additional_test_files')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.text('input').nullable();
    table.text('expected_output').nullable();
    table
      .enu('test_type', Object.values(TestType), {
        useNative: true,
        enumName: 'test_type_enum',
      })
      .notNullable();
    table.text('is_editable').defaultTo(false);
    table.dateTime('deleted_at').nullable().defaultTo(null);
    table.integer('version').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TYPE IF EXISTS "test_type_enum"');
  return knex.schema.dropTable('tests');
}

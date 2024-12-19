import { Knex } from 'knex';
import additionalTestFilesData from './03-additional-test-files.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(
    'TRUNCATE TABLE additional_test_files RESTART IDENTITY CASCADE',
  );

  return knex('additional_test_files').insert(additionalTestFilesData);
}

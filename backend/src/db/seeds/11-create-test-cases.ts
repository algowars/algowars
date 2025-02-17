import { Knex } from 'knex';
import testCases from './11-create-test-cases.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE test_cases RESTART IDENTITY CASCADE');

  return knex('test_cases').insert(testCases);
}

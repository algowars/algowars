import { Knex } from 'knex';
import testsData from './04-tests.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE tests RESTART IDENTITY CASCADE');

  return knex('tests').insert(testsData);
}

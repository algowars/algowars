import { Knex } from 'knex';
import problemSetupsData from './07-problem-setups.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE problem_setups RESTART IDENTITY CASCADE');

  return knex('problem_setups').insert(problemSetupsData);
}

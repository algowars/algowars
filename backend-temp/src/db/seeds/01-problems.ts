import { Knex } from 'knex';
import problemsData from './01-problems.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE problems RESTART IDENTITY CASCADE');

  return knex('problems').insert(problemsData);
}

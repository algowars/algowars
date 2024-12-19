import { Knex } from 'knex';
import submissionsData from './05-submissions.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE submissions RESTART IDENTITY CASCADE');

  return knex('submissions').insert(submissionsData);
}

import { Knex } from 'knex';
import submissionResultsData from './06-submission-results.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE submission_results RESTART IDENTITY CASCADE');

  return knex('submission_results').insert(submissionResultsData);
}

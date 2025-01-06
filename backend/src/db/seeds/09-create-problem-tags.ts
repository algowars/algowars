import { Knex } from 'knex';
import problemTagsData from './09-create-problem-tags.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE problem_tags RESTART IDENTITY CASCADE');

  return knex('problem_tags').insert(problemTagsData);
}

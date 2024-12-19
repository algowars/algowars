import { Knex } from 'knex';
import languagesData from './02-languages.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE languages RESTART IDENTITY CASCADE');

  return knex('languages').insert(languagesData);
}

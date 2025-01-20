import { Knex } from 'knex';
import tagsData from './08-create-tags.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE tags RESTART IDENTITY CASCADE');

  return knex('tags').insert(tagsData);
}

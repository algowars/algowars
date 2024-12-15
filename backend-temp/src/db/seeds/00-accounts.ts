import { Knex } from 'knex';
import accountsData from './00-accounts.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE accounts RESTART IDENTITY CASCADE');

  return knex('accounts').insert(accountsData);
}

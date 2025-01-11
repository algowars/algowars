import { Knex } from 'knex';
import playerElosDat from './10-player-elos.json';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE player_elos RESTART IDENTITY CASCADE');

  return knex('player_elos').insert(playerElosDat);
}

const environment = process.env.NODE_ENV || 'development';
import knexfile from '../../knexfile';
const config = knexfile[environment];
import knex from 'knex';
const knexInstance = knex(config);

module.exports = knexInstance;
module.exports = knex;

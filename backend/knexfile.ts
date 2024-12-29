import 'dotenv/config';
import * as path from 'path';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD = '',
  DATABASE_NAME,
  DEBUG,
  DATABASE_URL = '',
} = process.env;

const config = {
  development: {
    client: 'pg',
    pool: { min: 1, max: 5 },
    connection: {
      connectionString:
        DATABASE_URL.replace('[YOUR-PASSWORD]', DATABASE_PASSWORD) ?? '',
    },
    // connection: {
    //   database: DATABASE_NAME,
    //   user: DATABASE_USER,
    //   password: DATABASE_PASSWORD,
    //   host: DATABASE_HOST,
    //   port: DATABASE_PORT,
    // },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'db', 'seeds'),
    },
    debug: !!DEBUG,
  },
  production: {
    client: 'pg',
    pool: { min: 1, max: 5 },
    connection: {
      connectionString:
        DATABASE_URL.replace('[YOUR-PASSWORD]', DATABASE_PASSWORD) ?? '',
    },
    // connection: {
    //   database: DATABASE_NAME,
    //   user: DATABASE_USER,
    //   password: DATABASE_PASSWORD,
    //   host: DATABASE_HOST,
    //   port: DATABASE_PORT,
    // },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'db', 'seeds'),
    },
    debug: !!DEBUG,
  },
};

export default config;

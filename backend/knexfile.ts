import 'dotenv/config';
import path from 'path';

const {
  DATABASE_PASSWORD = '',
  DEBUG,
  DATABASE_URL = '',
  PRODUCTION_DATABASE_URL = '',
  PRODUCTION_DATABASE_PASSWORD = '',
} = process.env;

const config = {
  development: {
    client: 'pg',
    pool: { min: 1, max: 5 },
    connection: {
      connectionString:
        DATABASE_URL.replace('[YOUR-PASSWORD]', DATABASE_PASSWORD) ?? '',
    },
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
        PRODUCTION_DATABASE_URL.replace(
          '[YOUR-PASSWORD]',
          PRODUCTION_DATABASE_PASSWORD,
        ) ?? '',
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'db', 'seeds'),
    },
    debug: !!DEBUG,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
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

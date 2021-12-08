// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,

    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/db/migrations`,
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: `${__dirname}/src/db/seeds`,
    },
  },
  production: {
    client: 'pg',
    connection: {
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/db/migrations`,
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: `${__dirname}/src/db/seeds`,
    },
  },
};

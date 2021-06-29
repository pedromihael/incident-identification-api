// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
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
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
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

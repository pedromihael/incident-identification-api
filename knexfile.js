// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      username: 'postgres',
      password: 'postgres',
      // port: 5432,
      database: 'incidents_tool',
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

// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/incidents_mgmt.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
  },
};

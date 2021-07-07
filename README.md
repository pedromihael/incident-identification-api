# Incident Idenfication Tool

## Dependencies

You will need:

- [x] [Node JS](https://nodejs.org/en/download/)

Check installation running `npm --v`

- [x] [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

Check installation running `yarn -version`

- [x] [PostgreSQL](https://www.postgresql.org/download/)

Your user "postgres" must have the password "postgres", or any other set as the same as in "knexfile.js" file in this project.

If any error occurs, check how to configure your pg_hba.conf file. All "METHOD" fields should be "trust". Keep calm, it's local.

Check installation running `psql -U postgres`

### For first-time runnig

Install the dependencies running
```
yarn
```
Configure your .env file (in the root of this project, the same level of this README.md file). Follow the .env-example. For local development, keep "development" in NODE_ENV.

Run the latest migrations with
```
npx knex migrate:latest
```

OBS: Your database name, user and pass should always match the fields set in knexfile.js

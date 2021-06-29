exports.up = function (knex) {
  return knex.schema
    .createTable('provider', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').notNullable();
      table.float('reliability_percentage', 2).default(100);
      table.timestamps(true, true);
    })
    .alterTable('provider', (table) => {
      table.unique('name');
    })
    .createTable('severity_enum', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .alterTable('severity_enum', (table) => {
      table.unique('name');
    })
    .createTable('severity', (table) => {
      table.increments('id', { primaryKey: true });
      table.integer('weight').unsigned().notNullable();
      table.timestamps(true, true);

      table
        .integer('fk_severity_enum')
        .unsigned()
        .references('id')
        .inTable('severity_enum')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
    })
    .alterTable('severity', (table) => {
      table.unique('weight');
    })
    .createTable('project', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').notNullable();
      table.string('responsible').notNullable();
      table.float('reliability_percentage', 2).default(100);
      table.integer('hours_effort').unsigned().notNullable();
      table.timestamps(true, true);

      table
        .integer('fk_provider')
        .unsigned()
        .references('id')
        .inTable('provider')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
    })
    .alterTable('project', (table) => {
      table.unique('name');
    })
    .createTable('incident', (table) => {
      table.string('id', { primaryKey: true }).notNullable();
      table.string('description').notNullable();
      table.timestamps(true, true);

      table
        .integer('fk_severity')
        .unsigned()
        .references('id')
        .inTable('severity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table
        .integer('fk_project')
        .unsigned()
        .references('id')
        .inTable('project')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
    })
    .alterTable('incident', (table) => {
      table.unique('id');
    })
    .createTable('reliability', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').notNullable();
      table.float('meta_percent', 2).notNullable();
      table.timestamps(true, true);
    })
    .alterTable('reliability', (table) => {
      table.unique('name');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('incident')
    .dropTableIfExists('project')
    .dropTableIfExists('severity')
    .dropTableIfExists('severity_enum')
    .dropTableIfExists('provider')
    .dropTableIfExists('reliability');
};

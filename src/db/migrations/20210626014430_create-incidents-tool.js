exports.up = function (knex) {
  return knex.schema
    .createTable('provider', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').notNullable();
      table.float('reliability_percentage', 2).notNullable();
      table.timestamps(true, true);
    })
    .createTable('severity_enum', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').notNullable();
      table.timestamps(true, true);
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
        .onUpdate('CASCADE');
    })
    .createTable('project', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').notNullable();
      table.string('responsible').notNullable();
      table.float('reliability_percentage', 2).notNullable();
      table.integer('hours_effort').unsigned().notNullable();
      table.timestamps(true, true);

      table
        .integer('fk_provider')
        .unsigned()
        .references('id')
        .inTable('provider')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('incident', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('description').notNullable();
      table.timestamps(true, true);

      table
        .integer('fk_severity')
        .unsigned()
        .references('id')
        .inTable('severity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('fk_project')
        .unsigned()
        .references('id')
        .inTable('project')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('reliability', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').notNullable();
      table.float('meta_percent', 2).notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('provider')
    .dropTableIfExists('severity')
    .dropTableIfExists('project')
    .dropTableIfExists('severity_enum')
    .dropTableIfExists('incident')
    .dropTableIfExists('reliability');
};
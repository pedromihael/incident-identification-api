exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('severity')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('severity').insert([
        { weight: 1, fk_severity_enum: 1 },
        { weight: 5, fk_severity_enum: 2 },
        { weight: 10, fk_severity_enum: 3 },
        { weight: 100, fk_severity_enum: 4 },
      ]);
    });
};

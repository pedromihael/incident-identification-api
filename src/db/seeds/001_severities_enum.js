exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('severity_enum')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('severity_enum').insert([
        { name: 'Low' },
        { name: 'Medium' },
        { name: 'High' },
        { name: 'Critical' },
      ]);
    });
};

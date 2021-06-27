exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reliability')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('reliability').insert([
        { id: 1, name: 'providers', meta_percent: 98.0 },
        { id: 2, name: 'projects', meta_percent: 95.0 },
      ]);
    });
};

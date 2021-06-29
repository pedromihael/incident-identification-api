exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('project')
    .del()
    .then(function () {
      // Inserts seed entries
      const res1 = knex('project').update({ reliability_percentage: 100 }).where({ id: 1 });
      const res2 = knex('project').update({ reliability_percentage: 100 }).where({ id: 2 });
      const res3 = knex('project').update({ reliability_percentage: 100 }).where({ id: 3 });

      return [res1, res2, res3];
    });
};

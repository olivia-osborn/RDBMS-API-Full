
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Olivia', cohort_id: 2},
        {name: 'student2', cohort_id: 2},
        {name: 'student3', cohort_id: 2}
      ]);
    });
};

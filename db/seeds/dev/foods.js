exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(function () {
      return knex('foods').insert([
        {id: 1, name: 'Banana', calories: 150},
        {id: 2, name: 'Yogurt', calories: 550},
        {id: 3, name: 'Apple', calories: 220}
      ]);
    });
};

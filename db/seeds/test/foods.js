exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(function () {
      return knex('foods').insert([
        {id: 1, name: 'Banana', calories: 150},
        {id: 2, name: 'Bagel Bites - Four Cheese', calories: 650},
        {id: 3, name: 'Chicken Burrito', calories: 800},
        {id: 4, name: 'Yogurt', calories: 550},
        {id: 5, name: 'Gum', calories: 50},
        {id: 6, name: 'Cheese', calories: 400},
        {id: 7, name: 'Apple', calories: 220}
      ]);
    });
};

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

exports.seed = function(knex, Promise) {
  return knex('meals').del()
    .then(function(){
      return knex('meals').insert([
        {id: 1, name: 'Breakfast'},
        {id: 2, name: 'Snack'},
        {id: 3, name: 'Lunch'},
        {id: 4, name: 'Dinner'}
      ])
    })
}

exports.seed = function(knex, Promise){
  return knex('meal_foods').del()
    .then(function(){
      return knex('meal_foods').insert([
        {id: 1, meal_id: 1, food_id: 1},
        {id: 2, meal_id: 1, food_id: 4},
        {id: 3, meal_id: 1, food_id: 7},
        {id: 4, meal_id: 2, food_id: 1},
        {id: 5, meal_id: 2, food_id: 5},
        {id: 6, meal_id: 2, food_id: 6},
        {id: 7, meal_id: 3, food_id: 2},
        {id: 8, meal_id: 3, food_id: 3},
        {id: 9, meal_id: 3, food_id: 7},
        {id: 10, meal_id: 4, food_id: 1},
        {id: 11, meal_id: 4, food_id: 2},
        {id: 12, meal_id: 4, food_id: 3}
      ])
    })
}

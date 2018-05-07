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

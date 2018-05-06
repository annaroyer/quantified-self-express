exports.seed = function(knex, Promise){
  return knex('mealFoods').del()
    .then(function(){
      return knex('mealFoods').insert([
        {id: 1, mealId: 1, foodId: 1},
        {id: 2, mealId: 1, foodId: 4},
        {id: 3, mealId: 1, foodId: 7},
        {id: 4, mealId: 2, foodId: 1},
        {id: 5, mealId: 2, foodId: 5},
        {id: 6, mealId: 2, foodId: 6},
        {id: 7, mealId: 3, foodId: 2},
        {id: 8, mealId: 3, foodId: 3},
        {id: 9, mealId: 3, foodId: 7},
        {id: 10, mealId: 4, foodId: 1},
        {id: 11, mealId: 4, foodId: 2},
        {id: 12, mealId: 4, foodId: 3}
      ])
    })
}

const foodsData = require('../../../data/dev/foods')
const mealsData = require('../../../data/dev/meals')
const mealFoodsData = require('../../../data/dev/mealFoods')

exports.seed = function(knex, Promise){
  return knex('foods').del()
  .then(function () {
    return knex('foods').insert(foodsData)
  })
  .then(function() {
    return knex('meals').del()
    .then(function(){
      return knex('meals').insert(mealsData)
    })
  })
  .then(function() {
    return knex('meal_foods').del()
    .then(function(){
      return knex('meal_foods').insert(mealFoodsData)
    })
  })
}

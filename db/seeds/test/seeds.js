const foodsData = require('../../../data/test/foods')
const mealsData = require('../../../data/test/meals')
const mealFoodsData = require('../../../data/test/mealFoods')

exports.seed = function(knex, Promise){
  return knex('foods').del()
  .then(function () {
    return knex('foods').insert(foodsData)
  })
  .then(function(){
    return knex.raw(`ALTER SEQUENCE foods_id_seq RESTART 8`)
  })
  .then(function() {
    return knex('meals').del()
  })
  .then(function(){
    return knex('meals').insert(mealsData)
  })
  .then(function() {
    return knex('meal_foods').del()
  })
  .then(function(){
    return knex('meal_foods').insert(mealFoodsData)
  })
  .then(function(){
    return knex.raw(`ALTER SEQUENCE meal_foods_id_seq RESTART 13`)
  })
}

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Meal {
  static all(){
    return database('meals').select('id', 'name')
    .then(meals => {
      return Promise.all(
        meals.map(meal => {
          return database('foods')
          .select('foods.id', 'foods.name', 'foods.calories')
          .join('meal_foods', {'foods.id': 'meal_foods.food_id'})
          .where('meal_foods.meal_id', meal.id)
          .then(foods => {
            meal.foods = foods
            return meal
          })
        })
      )
     })
    }
  }

module.exports = Meal

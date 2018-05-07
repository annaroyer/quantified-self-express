const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Meal {
  static all(){
    return database('meals').select('id', 'name').map(this.setFoods)
  }

    static find(id){
      return database('meals').where('id', id).select('id', 'name')
      .then(rows => rows[0])
    }

    static setFoods(meal){
      return database('foods')
      .select('foods.id', 'foods.name', 'foods.calories')
      .join('meal_foods', {'foods.id': 'meal_foods.food_id'})
      .where('meal_foods.meal_id', meal.id)
      .then(foods => {
        meal.foods = foods
        return meal
      })
    }
  }

module.exports = Meal

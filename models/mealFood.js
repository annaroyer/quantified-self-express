const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class MealFood {
  static create(meal_id, food_id) {
    return database('meal_foods')
    .insert({meal_id: meal_id, food_id: food_id})
    .return(this.message(meal_id, food_id))
  }

  static destroy(meal_id, food_id){
    return database('meal_foods')
    .where('meal_foods.meal_id', meal_id)
    .where('meal_foods.food_id', food_id)
    .del()
  }

  static message(meal_id, food_id) {
    return database('meal_foods')
    .select({mealName: 'meals.name'}, {foodName: 'foods.name'})
    .join('meals', {'meals.id': 'meal_foods.meal_id'})
    .join('foods', {'foods.id': 'meal_foods.food_id'})
    .where('meal_foods.meal_id', meal_id)
    .where('meal_foods.food_id', food_id)
    .orderBy('meal_foods.created_at', 'desc').first()
  }
}

module.exports = MealFood

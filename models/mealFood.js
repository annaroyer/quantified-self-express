const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class MealFood {
  static create(attributes) {
    return database('meal_foods')
    .insert(attributes)
    .return(this.message(attributes))
  }

  static destroy(attributes){
    return database('meal_foods')
    .where(attributes)
    .del()
  }

  static message(attributes) {
    return database('meal_foods')
    .select({mealName: 'meals.name'}, {foodName: 'foods.name'})
    .where(attributes)
    .join('meals', {'meals.id': 'meal_foods.meal_id'})
    .join('foods', {'foods.id': 'meal_foods.food_id'})
    .first()
  }
}

module.exports = MealFood

const MealFood = require('../models/mealFood')

class MealFoodsController {
  static create(request, response, next){
    let meal_id = parseInt(request.params.meal_id)
    let food_id = parseInt(request.params.id)
    MealFood.create(meal_id, food_id)
    .then(mealFood => {
      if(mealFood){
        let message = `Successfully added ${mealFood.foodName} to ${mealFood.mealName}`
        response.status(201).json({ message: message })
      } else {
        response.sendStatus(404)
      }
    })
  }

  static destroy(request, response, next) {
    let meal_id = parseInt(request.params.meal_id)
    let food_id = parseInt(request.params.id)
    let message
    MealFood.message(meal_id, food_id)
    .then(names => {
      if(names){
        message = `Successfully removed ${names.foodName} from ${names.mealName}`
        MealFood.destroy(meal_id, food_id)
        .then(() => {
          response.json({message: message})
        })
      } else {
        response.sendStatus(404)
      }
    })
  }
}

module.exports = MealFoodsController

const MealFood = require('../models/mealFood')

class MealFoodsController {
  static create(request, response, next){
    let params = {meal_id: request.params.meal_id, food_id: request.params.id}
    MealFood.create(params)
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
    let params = {meal_id: request.params.meal_id, food_id: request.params.id}
    MealFood.message(params)
    .then(names => {
      if(names){
        MealFood.destroy(params)
        .then(() => {
          let message = `Successfully removed ${names.foodName} from ${names.mealName}`
          response.json({message: message})
        })
      } else {
        response.sendStatus(404)
      }
    })
  }
  static params(request){
    return {meal_id: request.params.meal_id, food_id: request.params.id}
  }
}

module.exports = MealFoodsController

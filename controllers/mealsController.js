const Meal = require('../models/meal')

class MealsController {
  static index(request, response, next){
    Meal.all()
    .then(meals => response.json(meals))
  }

  static show(request, response, next){
    Meal.find(request.params.meal_id)
    .then(meal => response.json(meal))
  }
}

module.exports = MealsController

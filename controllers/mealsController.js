const Meal = require('../models/meal')

class MealsController {
  static index(request, response, next){
    Meal.all()
    .then(meals => response.json(meals))
  }
}

module.exports = MealsController

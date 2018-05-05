const Meal = require('../models/meal')
const pry = require('pryjs')

class MealsController {

  static index(request, response, next){
    Meal.all()
    .then(meals => response.json(meals))
  }

}

module.exports = MealsController

const Food = require('../models/food')

const pry = require('pryjs')

class FoodsController {

  static index(request, response, next){
    Food.all()
    .then(foods => response.json(foods))
  }

  static show(request, response, next){
    Food.find(request.params.id)
    .then(food => {
      if(food){
        response.json(food)
      } else {
        return response.sendStatus(404)
      }
    })
  }

  static create(request, response, next){
    let calories = parseInt(request.body.food.calories)
    let name = request.body.food.name
    if(calories && name){
      Food.create({name: name, calories: calories})
      .then(food => response.status(201).json(food))
    } else {
      response.sendStatus(400)
    }
  }

  static update(request, response, next){
    Food.update(request.params.id, request.body.food)
    .then(food => {
      if(food){
        response.json(food)
      } else {
        response.sendStatus(404)
      }
    })
  }

  static destroy(request, response, next){
    Food.find(request.params.id)
    .then(food => {
      if(food){
        Food.destroy(food.id)
        .then(response.sendStatus(204))
      } else {
        response.sendStatus(404)
      }
    })
  }
}

module.exports = FoodsController

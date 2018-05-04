const Food = require('../models/food')
const pry = require('pryjs')

class FoodsController {

  static index(request, response, next){
    Food.all()
    .then(foods => response.status(200).json(foods))
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
    Food.create(request.body.food)
    .then(food => response.status(201).json(food))
    .catch(error => response.sendStatus(400))
  }

  static update(request, response, next){
    Food.update(request.params.id, request.body.food)
    .then(food => response.json(food))
  }
}

module.exports = FoodsController

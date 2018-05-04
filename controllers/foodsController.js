const Food = require('../models/food')

class FoodsController {
  static index(request, response, next){
    Food.all()
    .then(foods => response.status(200).json(foods))
    .catch(error => response.status(500).json({ error }))
  }

  static show(request, response, next){
    Food.find(request.params.id)
    .then(food => response.status(200).json(food))
    .catch(error => response.status(500).json({ error }))
  }
}

module.exports = FoodsController

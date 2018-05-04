const Food = require('../models/food')

class FoodsController {
  static index(request, response, next){
    Food.all()
    .then(function(foods){
      response.status(200).json(foods)
    })
    .catch(function(error){
      response.status(500).json({ error })
    })
  }

  static show(request, response, next){
    let id = request.params.id
    Food.find(id)
    .then(food => response.status(200).json(food))
    .catch(error => response.status(500).json({ error }))
  }
}

module.exports = FoodsController

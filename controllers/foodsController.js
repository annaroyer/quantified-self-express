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
}

module.exports = FoodsController

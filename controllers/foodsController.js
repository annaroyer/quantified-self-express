const Food = require('../models/food')

class FoodsController {
  static index(){
    return Food.all()
  }
}

module.exports = FoodsController

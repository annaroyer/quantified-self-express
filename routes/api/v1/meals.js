const express = require('express')
const router = express.Router()

const mealsController = require('../../../controllers/mealsController')
const mealFoodsController = require('../../../controllers/mealFoodsController')

router.get('/', mealsController.index)
router.get('/:meal_id/foods', mealsController.show)
router.post('/:meal_id/foods/:id', mealFoodsController.create)

module.exports = router

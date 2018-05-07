const express = require('express');
const router = express.Router();
const mealsController = require('../../../controllers/mealsController')

router.get('/', mealsController.index)

module.exports = router

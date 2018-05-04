const express = require('express');
const router = express.Router();
const FoodsController = require('../../../controllers/foodsController')

router.get('/', FoodsController.index)

module.exports = router;

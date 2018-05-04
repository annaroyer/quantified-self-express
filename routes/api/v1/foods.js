const express = require('express');
const router = express.Router();
const FoodsController = require('../../../controllers/foodsController')

router.get('/', FoodsController.index)
router.get('/:id', FoodsController.show)
router.post('/', FoodsController.create)
router.patch('/:id', FoodsController.update)

module.exports = router;

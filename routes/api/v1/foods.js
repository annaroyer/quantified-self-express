const express = require('express');
const router = express.Router();
const FoodsController = require('../../../controllers/foodsController')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/', function(request, response, next){
  database('foods').select()
  .then(function(foods){
    response.status(200).json(foods)
  })
  .catch(function(error){
    response.status(500).json({ error })
  })
})

module.exports = router;

const pry = require('pryjs')
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {
  static all(){
    return database('foods').select('id', 'name', 'calories')
  }

  static find(id){
    return database('foods').where('id', id).select('id', 'name', 'calories')
    .then(data => data[0])
  }
}

module.exports = Food

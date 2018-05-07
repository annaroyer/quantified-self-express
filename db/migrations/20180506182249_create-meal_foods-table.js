exports.up = function(knex, Promise) {
  return knex.schema.createTable('meal_foods', function(table){
     table.increments()
     table.integer('meal_id').index()
     table.integer('food_id').index()
     table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meal_foods')
}

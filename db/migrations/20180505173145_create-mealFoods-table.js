
exports.up = function(knex, Promise) {
  return knex.schema.createTable('mealFoods', function(table){
    table.increments()
    table.integer('mealId').references('meals.id').index()
    table.integer('foodId').references('foods.id').index()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mealFoods')
};

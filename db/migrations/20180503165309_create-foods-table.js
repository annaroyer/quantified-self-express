
exports.up = function(knex, Promise) {
  return knex.schema.withSchema('public').createTable('foods', function(table){
    table.increments()
    table.string('name').notNullable()
    table.integer('calories').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foods')
};

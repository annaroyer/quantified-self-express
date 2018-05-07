
exports.up = function(knex, Promise) {
  return knex.schema.withSchema('public').createTable('meals', function(table){
    table.increments()
    table.string('name').notNullable
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals')
};

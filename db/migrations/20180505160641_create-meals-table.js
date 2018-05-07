
exports.up = function(knex, Promise) {
  return knex.schema.withSchema('public').createTable('meals', function(table){
    table.increments()
    table.string('name').notNullable
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals')
};

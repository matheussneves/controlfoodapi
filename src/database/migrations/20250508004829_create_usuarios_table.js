exports.up = function(knex) {
    return knex.schema.hasTable('usuarios').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('usuarios', function(table) {
          table.increments('id').primary();
          table.string('nome').notNullable();
          table.string('email').notNullable();
          table.string('senha').notNullable();
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
      }
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usuarios');
  };
  

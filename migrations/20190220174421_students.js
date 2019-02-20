
exports.up = function(knex, Promise) {
    return knex.schema.createTable("students", function(tbl) {
        //primary key called id:
        tbl.increments();
  
        tbl
            .string("name", 128)
            .notNullable()

        tbl
            .integer("cohort_id")
            .unsigned()
            .references("id")
            .inTable("cohorts")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("students")
  };
  
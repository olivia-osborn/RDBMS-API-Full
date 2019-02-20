
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
      //primary key called id:
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts")
};

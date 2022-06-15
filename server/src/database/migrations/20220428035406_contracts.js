exports.up = function (knex) {
  return knex.schema.createTable("contracts", (table) => {
    table.string("id").primary();
    table.string("title").notNullable();
    table.string("thumbnail").notNullable();
    table.string("thumbnail_type").notNullable();
    table.string("thumbnail_width").notNullable();
    table.string("thumbnail_height").notNullable();
    table.string("thumbnail_size").notNullable();
    table.string("file").notNullable();
    table.string("customer_id")
      .notNullable()
      .references("id")
      .inTable("customers")
      .onDelete("CASCADE");
    table.string("professional_id")
      .notNullable()
      .references("id")
      .inTable("professionals")
      .onDelete("CASCADE");
 
    table.timestamp("updateAt").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp("createdAt").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("contracts");
};
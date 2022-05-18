exports.up = function (knex) {
  return knex.schema.createTable("forms", (table) => {
    table.string("form_id").primary();
    table.string("contract_text").notNullable();
    table.string("local_application").notNullable();
    table.string("image_dimension").notNullable();
    table.integer("total_value_money").notNullable();
    table.string("id_customer")
      .notNullable()
      .references("id")
      .inTable("customers")
      .onDelete("CASCADE");
 
    table.timestamp("updateAt").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp("createdAt").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("forms");
};
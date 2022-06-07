exports.up = function (knex) {
  return knex.schema.createTable("professionals", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("surname").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("telephone").notNullable();
    table.string("birth_date").notNullable();
    table.enu("identity_type", ["cpf", "rg"]).defaultTo(null);
    table.string("identity_card").notNullable();
    table.string("area_activity").notNullable();
    table.integer("primary_user").defaultTo(0).notNullable();
    
    table.timestamp("updateAt").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp("createdAt").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("professionals");
};
exports.up = function (knex) {
  return knex.schema.createTable("customers", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("surname").notNullable();
    table.string("email").notNullable();
    table.string("telephone").notNullable();
    table.string("birth_date").notNullable();
    table.enu("identity_type", ["cpf", "rg"]).defaultTo(null);
    table.string("identity_card").notNullable();
    
    table.string("zipcode").notNullable();
    table.string("address").notNullable();
    table.string("district").notNullable();
    table.string("complement");
    table.string("city").notNullable();
    table.string("state").notNullable();

    table.integer("pressure").defaultTo(0);
    table.integer("diabetic").defaultTo(0);
    table.integer("hemophiliac").defaultTo(0);
    table.integer("healing").defaultTo(0);
    table.integer("eplsepsis").defaultTo(0);
    table.integer("fainting").defaultTo(0);
    table.string("allergy_medication");
    table.string("hepatitis");

    table.string("created_by").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp("createdAt").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
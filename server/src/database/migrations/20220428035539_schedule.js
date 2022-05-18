exports.up = function (knex) {
  return knex.schema.createTable("schedule", (table) => {
    table.string("schedule_id").primary();
    table.date("scheduled_date").notNullable();
    table.time("scheduled_time").notNullable();
    table.string("id_customer")
      .notNullable()
      .references("id")
      .inTable("customers")
      .onDelete("CASCADE");

    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("schedule");
};

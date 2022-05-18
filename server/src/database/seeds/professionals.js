exports.seed = function (knex) {
  knex("professionals").insert([
    {
      id: "0361ddbbcc92022",
      name: "Acacio de Lima",
      email: "limadeacacio@gmail.com",
      password: "$2b$10$qciRG8CMZlnJHdqfc9NDcu.wuadRxuQBU9.neNPO09tD0vnUJ7Rii",
      primary_user: 1,
      updateAt: "2022-04-23 13:16:45",
      createdAt: "2022-04-23 13:16:45"
    },
  ]);
};
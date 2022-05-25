exports.seed = function (knex) {
  knex("professionals").insert([
    {
      id: "0361ddbbcc92022",
      name: "Acacio de Lima",
      email: "limadeacacio@gmail.com",
      password: "$2b$10$qciRG8CMZlnJHdqfc9NDcu.wuadRxuQBU9.neNPO09tD0vnUJ7Rii",
      primary_user: 1,
    }, {
      id: "241c516770a4eda",
      name: "Leonardo Ximenes",
      email: "leo@gmail.com",
      password: "2b$10$u7kMUW7zf2W.bMhwSel2BuOLXA85Dkq5oBvDYI0fvk/GvWuWqN0Ve",
    },
  ]);
};

exports.seed = function (knex) {
  return knex("professionals").insert([
    {
      id: "0361ddbbcc92022",
      name: "Acacio",
      surname: "de Lima",
      email: "limadeacacio@gmail.com",
      password: "$2b$10$/HR6ESB8JitGblj4N5AgqeY6jxqifHfxYn//IUxYVLhgEeNCYugsm", // 1234
      primary_user: 1,
    },
    {
      id: "241c516770a4eda",
      name: "Leonardo",
      surname: "Ximenes",
      email: "leo@gmail.com",
      password: "$2b$10$/HR6ESB8JitGblj4N5AgqeY6jxqifHfxYn//IUxYVLhgEeNCYugsm", // 1234
    },
  ]);
};

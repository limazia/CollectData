exports.seed = function (knex) {
  knex("users").insert([
    {
      id: "685209951e230",
      email: "fabin@gmail.com",
      name: "Fabio Batoni",
      password: "fabio",
    }
  ]);
};
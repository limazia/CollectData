// Importa as libs
const express = require("express");
require("express-group-routes");

// Inicia o Routes do Express
const routes = express.Router();

// Helpers
const { env } = require("./helpers/utils.helper");

// Controllers
const AuthController = require("./app/controllers/AuthController");
const UserController = require("./app/controllers/UserController");

// Middlewares
const Authentication = require("./app/middlewares/Authentication");

// Rota principal "/"
routes.get("/", function (request, response) {
  response.json({
    name: env("APP_NAME", "Collect Data"),
    environment: env("APP_ENV", "development"),
    team: {
      "Luis Renato": "DBA & UI/UX",
      "Acacio de Lima": "Back-end",
      "Matheus Bizo": "",
      "Leonardo Ximenes": "",
      "Gabriel Oliveira": "Front-end",
    },
    technologies: ["Node", "React", "MySQl", "Java"],
  });
});
 
// Rotas de autenticação
routes.group("/api/auth", (router) => {
  router.post("/login", AuthController.loginUser);
  router.post("/logout", Authentication.token, AuthController.logoutUser);
});

// Rota do usuario logado
routes.group("/api/me", (router) => {
  router.get("/account", Authentication.token, AuthController.account);
  router.put("/update", Authentication.token, UserController.updateUserById);
  router.delete("/delete/:id", Authentication.token, UserController.deleteUserById);
});

// Rota dos usuarios em geral
routes.group("/api/users", (router) => {
  router.get("/", UserController.listAllUsers);
  router.post("/register", UserController.createUser);
  router.put("/update/:id", UserController.updateUserById);
});
 
module.exports = routes;

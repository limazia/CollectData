const express = require("express");
require("express-group-routes");

// Controllers
const AuthController = require("./app/controllers/AuthController");
const UserController = require("./app/controllers/UserController");

// Middlewares
const Authentication = require("./app/middlewares/Authentication");

const routes = express.Router();

routes.get("/", function (request, response) {
  response.send("Collect Data");
});

routes.group("/api/auth", (router) => {
  router.post("/register", AuthController.createUser);
  router.post("/login", AuthController.loginUser);
  router.post("/logout", Authentication.token, AuthController.logoutUser);
});

routes.group("/api/me", (router) => {
  router.get("/account", Authentication.token, AuthController.account);
});

module.exports = routes;
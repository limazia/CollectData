// Importa as libs
const express = require("express");
require("express-group-routes");

// Inicia o Routes do Express
const routes = express.Router();

// Helpers
const { env } = require("./helpers/utils.helper");

// Controllers
const AuthController = require("./app/controllers/AuthController");
const AccountController = require("./app/controllers/AccountController");
//const PasswordController = require("./app/controllers/PasswordController");
const ProfessionalController = require("./app/controllers/ProfessionalController");
const CustomerController = require("./app/controllers/CustomerController");
const ScheduleController = require("./app/controllers/ScheduleController");

// Middlewares
const Authentication = require("./app/middlewares/Authentication");

// Rota principal "/"
routes.get("/", function (request, response) {
  response.json({
    name: env("APP_NAME", "Collect Data"),
    environment: env("APP_ENV", "development"),
    technologies: ["Node", "React", "MySQl", "Java"],
  });
});
 
// Rotas de autenticação
routes.group("/api/auth", (router) => {
  router.post("/login", AuthController.login);
  router.post("/register", AuthController.register);
  router.post("/logout", Authentication.token, AuthController.logout);
});

// Rota de resetar senha
/*
routes.group("/api/password", (router) => {
  router.get("/:token", PasswordController.userResetCheck);
  router.post("/forgot", PasswordController.userForgotPassword);
  router.post("/reset", PasswordController.userResetPassword);
});
*/

/*
  async deleteUserById(request, response) {
    const { id } = request.params;
    const user = await connection("users").select("*").where({ id });

    if (user.length >= 1) {
      await connection("users").where({ id }).del();

      return response.json({ message: "Usuário deletado com sucesso" });
    }

    return response.json({ error: "Nenhum usuário foi encontrada com esta {ID}" });
  }
*/

// Rota do usuario logado
routes.group("/api/me", (router) => {
  router.get("/account", Authentication.token, AccountController.account);
  router.put("/update/:scope/:id", Authentication.token, AccountController.updateByScope);
});

// Rota dos profissionais
routes.group("/api/professionals", (router) => {
  router.get("/", Authentication.token, ProfessionalController.listAllProfessionals);
  router.get("/:id", Authentication.token, ProfessionalController.findProfessionalById);
  router.post("/create", Authentication.token, ProfessionalController.createProfessional);
  router.put("/update/:id", Authentication.token, ProfessionalController.updateProfessionalById);
  router.delete("/delete/:id", Authentication.token, ProfessionalController.deleteProfessionalById);
});

// Rota dos clientes
routes.group("/api/customers", (router) => {
  router.get("/", Authentication.token, CustomerController.listAllCustomers);
  router.get("/:id", Authentication.token, CustomerController.findCustomerById);
  router.post("/create", Authentication.token, CustomerController.createCustomer);
  router.put("/update/:id", Authentication.token, CustomerController.updateCustomerById);
  router.delete("/delete/:id", Authentication.token, CustomerController.deleteCustomerById);
});

// Rota dos agendamentos
routes.group("/api/schedule", (router) => {
  router.get("/", Authentication.token, ScheduleController.listAllSchedules);
  router.get("/:id", Authentication.token, ScheduleController.findScheduleById);
  router.post("/create", Authentication.token, ScheduleController.createSchedule);
  router.put("/update/:id", Authentication.token, ScheduleController.updateScheduleById);
  router.delete("/delete/:id", Authentication.token, ScheduleController.deleteScheduleById);
});
  
module.exports = routes;
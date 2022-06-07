// Importa as libs
require("express-group-routes");
const express = require("express");
const multer = require("multer");

// Configuração do Multer
const { MulterConfig } = require("./config");

// Inicia o Routes do Express
const routes = express.Router();
const upload = multer(MulterConfig);

// Helpers
const { env } = require("./helpers/utils.helper");

// Controllers
const AuthController = require("./app/controllers/AuthController");
const AccountController = require("./app/controllers/AccountController");
const ProfessionalController = require("./app/controllers/ProfessionalController");
const CustomerController = require("./app/controllers/CustomerController");
const ContractController = require("./app/controllers/ContractController");
const ScheduleController = require("./app/controllers/ScheduleController");
const FakerController = require("./app/controllers/FakerController");

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
  router.post("/logout", Authentication.token, AuthController.logout);
});

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
  router.put("/:scope/:id", Authentication.token, CustomerController.updateCustomerById);
  router.delete("/delete/:id", Authentication.token, CustomerController.deleteCustomerById);
});

// Rota dos contrato
routes.group("/api/contracts", (router) => {
  router.get("/:id", Authentication.token, ContractController.listAllContract);
  router.post("/create", Authentication.token, upload.single("image"), ContractController.createContract);
  router.delete("/delete/:id", Authentication.token, ContractController.deleteContractById);
});

// Rota dos agendamentos
routes.group("/api/schedule", (router) => {
  router.get("/", Authentication.token, ScheduleController.listAllSchedules);
  router.get("/:id", Authentication.token, ScheduleController.findScheduleById);
  router.post("/create", Authentication.token, ScheduleController.createSchedule);
  router.put("/update/:id", Authentication.token, ScheduleController.updateScheduleById);
  router.delete("/delete/:id", Authentication.token, ScheduleController.deleteScheduleById);
});

// Rotas de criação fake
routes.group("/api/faker", (router) => {
  router.get("/:scope/:amount", FakerController.createFaker);
});

module.exports = routes;
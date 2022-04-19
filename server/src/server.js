require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");
const { errors } = require("celebrate");

const routes = require("./routes");
const { AppConfig } = require("./config");
const { handleError } = require("./helpers/error.helper");

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "tmp", "uploads")));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});
app.use((request, response, next) => {
  request.io = io;
  return next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.locals = AppConfig.locals;

server.listen(AppConfig.port, () => {
  console.log(`[app.js] > Server running in ${AppConfig.server}`);
});

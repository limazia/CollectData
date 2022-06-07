require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { AppConfig } = require("./config");
const { handleError } = require("./helpers/error.helper");
const { testConnection, uploadFolders } = require("./helpers/init.helper");

const app = express();

if (process.env.APP_DEBUG === true) app.use(morgan(':method :url :status :response-time ms'));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.use("/contracts", express.static(path.resolve(__dirname, "..", "uploads", "contracts")));
app.use("/gallery", express.static(path.resolve(__dirname, "..", "uploads", "gallery")));

app.listen(AppConfig.port, () => {
  try {
    console.log("Starting up!");

    testConnection();
    uploadFolders();
  } catch (ex) {
    console.log("error" + ex);
  } finally {
    console.log(`Listening on port ${AppConfig.port}`);
  }
});
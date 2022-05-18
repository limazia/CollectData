require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");
const { AppConfig } = require("./config");
const { handleError } = require("./helpers/error.helper");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.use("/contract", express.static(path.resolve(__dirname, "..", "tmp", "uploads", "contract")));
app.use("/gallery", express.static(path.resolve(__dirname, "..", "tmp", "uploads", "gallery")));

app.listen(AppConfig.port, () => {
  console.log(`[app.js] > Server running in ${AppConfig.server}`);
});
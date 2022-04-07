require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

const routes = require("./routes");

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static(path.resolve(__dirname, '..', 'images')));
app.use(routes);

const port = process.env.APP_PORT || 3333;

app.listen(port, () => {
  console.log(`Server running in http://localhost":${port}`);
});
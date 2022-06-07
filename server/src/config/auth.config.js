const { env } = require("./../helpers/utils.helper");

module.exports = {
  secret: env("APP_SECRET_KEY", "QmxhQkNoYXQ=="),
  expiresIn: "7d",
  refreshExpiresIn: "14d",
};
const path = require("path");
const { env } = require("./../helpers/utils.helper");
 
module.exports = {
  development: {
    client: env("DB_DRIVE", "mysql"),
    connection: {
      host: env("DB_HOST", "localhost"),
      port: env("DB_PORT", 3306),
      user: env("DB_USERNAME", "root"),
      password: env("DB_PASSWORD", ""),
      database: env("DB_DATABASE", ""),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, "../", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "../", "database", "seeds"),
    },
  },

  production: {
    client: env("DB_DRIVE", null),
    connection: {
      host: env("DB_HOST", null),
      port: env("DB_PORT", 3306),
      user: env("DB_USERNAME", null),
      password: env("DB_PASSWORD", null),
      database: env("DB_DATABASE", null),
    },
    migrations: {
      directory: path.resolve(__dirname, "../", "database", "migrations"),
    },
  },
};
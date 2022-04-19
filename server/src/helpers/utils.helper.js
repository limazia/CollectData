require("dotenv").config();

const env = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;

  if (typeof value === "undefined") {
    if (process.env.NODE_ENV === "development") {
      console.log(`Environment variable ${key} not set.`);
    } else {
      throw new Error(`Environment variable ${key} not set.`);
    }
  }

  return value;
};

module.exports = {
  env,
};
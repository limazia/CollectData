const cryptoRandomString = require("crypto-random-string");
const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

const connection = require("../database/connection");

faker.locale = "pt_BR";

async function createUser(request, response, next, table) {
  try {
    const { amount = 1 } = request.params;
    let users = [];

    if (!table) {
      throw Error("[Faker] Missing table");
    }

    for (let i = 1; i <= amount; i++) {
      const id = cryptoRandomString({ length: 15 });
      const name = faker.name.firstName();
      const surname = faker.name.lastName();
      const base_email = faker.internet.email();

      const email = `${name.toLowerCase()}_${surname.toLowerCase()}@${base_email.split("@", 2)[1]}`;

      users.push({ id, name, surname, email });

      const userPath = path.resolve(__dirname, "../../", "uploads", "contracts", id);

      if (!fs.existsSync(userPath)){
        fs.mkdirSync(userPath);
      }

      await connection(table).insert({
        id,
        name,
        surname,
        email,
        created_by: "0361ddbbcc92022"
      });
    }

    const list = users.map((row) => {
      const { id, name, surname, email } = row;

      return {
        id,
        name,
        surname,
        email,
      };
    });

    return response.json(list);
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  createUser,
};

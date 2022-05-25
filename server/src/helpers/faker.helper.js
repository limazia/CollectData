const cryptoRandomString = require("crypto-random-string");
const { faker } = require("@faker-js/faker");
const connection = require("../database/connection");

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
      const email = faker.internet.email();

      users.push({ id, name, email });

      await connection(table).insert({
        id,
        name,
        email,
      });
    }

    const list = users.map((row) => {
      const { id, name, email } = row;

      return {
        id,
        name,
        email,
      };
    });

    return response.json({ list });
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  createUser,
};

const { createUser } = require("../../helpers/faker.helper");

class FakerController {
  async createFaker(request, response, next) {
    try {
      const { scope } = request.params;
      const allowedScopes = ["professionals", "customers"];

      if (allowedScopes.includes(scope)) {
        switch (scope) {
          case "professionals":
            createUser(request, response, next, "professionals");
            break;
          case "customers":
            createUser(request, response, next, "customers");
            break;
          default:
            response.json({ error: "Type not identified in allowed scope" });
        }
      } else {
        return response.json({ error: "Type not identified in allowed scope" });
      }
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new FakerController();
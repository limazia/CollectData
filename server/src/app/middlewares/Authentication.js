const jwt = require("jsonwebtoken");

const { AuthConfig } = require("../../config");

class Authentication {
  async token(request, response, next) {
    /*
    const authHeader =
      request.headers.authorization &&
      request.headers.authorization.split(" ")[0] === "Bearer"
        ? request.headers.authorization.split(" ")[1]
        : request.body.token ||
          request.query.token ||
        request.headers["x-access-token"];
    */

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.json({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = jwt.verify(token, AuthConfig.secret);
      request.userId = decoded.id;

      return next();
    } catch (err) {
      return response.json({ error: "Token invalido..." });
    }
  }
}

module.exports = new Authentication();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = require("../../database/connection");
const { AuthConfig } = require("../../config");

class AuthController {
  async login(request, response, next) {
    try {
      const { email, password } = request.body;
      const user = await connection("professionals").where({ email });

      if (!email) {
        return response.json({ error: "Digite um email" });
      }

      if (!password) {
        return response.json({ error: "Digite uma senha" });
      }

      if (user.length >= 1) {
        if (!(await bcrypt.compare(password, user[0].password))) {
          return response.json({ error: "Email e/ou senha invalidos" });
        }

        user[0].password = undefined;

        const { id } = user[0];
        const token = jwt.sign({ id }, AuthConfig.secret, { expiresIn: AuthConfig.expiresIn });

        return response.json({
          type: "bearer",
          token,
          refreshToken: null,
        });
      } else {
        return response.json({ error: "O email que você inseriu não está vinculado a uma conta." });
      }
    } catch (ex) {
      next(ex);
    }
  }
 
  async logout(request, response, next) {
    try {
      return response.json({ status: true });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new AuthController();
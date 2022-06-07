const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = require("../../database/connection");
const { AuthConfig } = require("../../config");
const constant = require("../constants");

class AuthController {
  async login(request, response, next) {
    try {
      const { email, password } = request.body;
      const user = await connection("professionals").where({ email });

      if (!email) {
        return response.json({ error: constant.error.input.ENTER_AN_EMAIL });
      }

      if (!password) {
        return response.json({ error: constant.error.input.ENTER_AN_PASSWORD });
      }

      if (user.length >= 1) {
        if (!(await bcrypt.compare(password, user[0].password))) {
          return response.json({ error: constant.error.form.INVALID_EMAIL_PASSWORD });
        }

        user[0].password = undefined;

        const { id } = user[0];
        const token = jwt.sign({ id }, AuthConfig.secret, { expiresIn: AuthConfig.expiresIn });
        const refreshToken = jwt.sign({ id }, AuthConfig.secret, { expiresIn: AuthConfig.refreshExpiresIn });

        return response.json({
          type: "bearer",
          token,
          refreshToken: null,
        });
      } else {
        return response.json({ error: constant.error.form.THE_EMAIL_YOU_ENTERED_IS_NOT_LINKED_TO_AN_ACCOUNT });
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
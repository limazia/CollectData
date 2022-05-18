const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const moment = require("moment");

const connection = require("../../database/connection");
const authConfig = require("../../config/auth");

const ConfirmationEmail = require("../jobs/ConfirmationEmail");
const ResetPasswordEmail = require("../jobs/ResetPasswordEmail");
const Queue = require("../../lib/Queue");

moment.locale("pt-br");

class PasswordController {
  async userForgotPassword(request, response, next) {
    const { email } = request.body;
    try {
      const user = await connection("users").select("*").where({ email });
      const { id, name } = user[0];

      if (user.length > 0) {
        const token = crypto.randomBytes(20).toString("hex");
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await connection("reset_password")
          .update({
            password_token: token,
            password_expires: now,
          })
          .where({ user_id: id });

        await Queue.add(ResetPasswordEmail.key, { name, email, token });

        return response.json({ message: "Instruções enviada com sucesso." });
      } else {
        return response.json({ error: "Usuário não encontrado" });
      }
    } catch (ex) {
      next(ex);
    }
  }

  async userResetPassword(request, response, next) {
    const { token, password, confirmpassword } = request.body;
    try {
      const user = await connection("users")
        .select("*")
        .leftJoin("reset_password", "reset_password.user_id", "=", "users.id")
        .where({ password_token: token });
      const now = new Date();

      const salt = bcrypt.genSaltSync(10);
      const passwordCrypt = bcrypt.hashSync(password, salt);

      if (user.length > 0) {
        if (token !== user[0].password_token) {
          return response.json({ error: "Token inválido." });
        }

        if (now > user[0].password_expires) {
          return response.json({
            error: "Token expirado, gere um novo token.",
          });
        }

        if (password !== confirmpassword) {
          return response.json({ error: "As senhas não coincidem" });
        }

        await connection("users")
          .update({ password: passwordCrypt })
          .where({ email: user[0].email });

        await connection("reset_password")
          .update({
            password_token: "",
            password_expires: "",
          })
          .where({ user_id: user[0].id });

        return response.json({ message: "Senha alterada com sucesso." });
      } else {
        return response.json({ error: "Usuário não encontrado." });
      }
    } catch (ex) {
      next(ex);
    }
  }

  async userResetCheck(request, response, next) {
    const { token } = request.params;
    try {
      if (token) {
        const tokenDB = await connection("reset_password")
          .select("*")
          .where({ password_token: token });

        if (tokenDB.length > 0) {
          return response.json({ message: tokenDB[0].password_token });
        } else {
          return response.json({ error: "Token invalido" });
        }
      } else {
        return response.json({ error: "Token não informado" });
      }
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new PasswordController();

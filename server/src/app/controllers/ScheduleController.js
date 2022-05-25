const bcrypt = require("bcrypt");
const moment = require("moment");
const cryptoRandomString = require("crypto-random-string");

const connection = require("../../database/connection");
const { ConstantSuccess } = require("../../app/constants");

moment.locale("pt-br");

class ScheduleController {
  async listAllSchedules(request, response, next){
    try {
      return response.json({ data: null });
    } catch (ex) {
      next(ex);
    }
  }

  async createSchedule(request, response, next) {
    try {
      const { name, email, password, confirmPassword } = request.body;
      const user = await connection("users").where({ email });
      const salt = bcrypt.genSaltSync(10);
      const passwordCrypt = bcrypt.hashSync(password, salt);
      const id = cryptoRandomString({ length: 15 });

      if (!name) {
        return response.json({ error: "Digite um nome" });
      }

      if (!email) {
        return response.json({ error: "Digite um email" });
      } else {
        if (user.length > 0) {
          return response.json({ error: "Email já registrado" });
        }
      }

      if (!password) {
        return response.json({ error: "Digite uma senha" });
      }

      if (password != confirmPassword) {
        return response.json({ error: "As senhas não coincidem" });
      }

      await connection("users").insert({
        id,
        name,
        email,
        password: passwordCrypt
      });    
      
      return response.json({ message: "Conta criada com sucesso" });
    } catch (ex) {
      next(ex);
    }
  }

  async findScheduleById(request, response, next) {
    try {
      const { id } = request.params;
      const results = await connection("users").where({ id });

      if (results.length >= 1) {
        const {
          id,
          name,
          email,
          createdAt
        } = results[0];

        return response.json({
          id,
          name,
          avatar: "https://www.tutorialrepublic.com/examples/images/avatar/2.jpg",
          email,
          created_at: moment(createdAt).format("LLL"),
          permissions: ["login_admin", "view_cv", "edit_cv"]
        });
      } else {
        response.json({ error: "Nenhum usuário foi encontrado com este id." });
      }
    } catch (ex) {
      next(ex);
    }
  }

  async updateScheduleById(request, response, next) {
    try {
      const { username, email, password, newPassword, confirmNewPassword } = request.body;

      const user = await connection("users").where({ id: request.userId });
      const checkUsername = username && await connection("users").where({ username });
      const checkEmail = email && await connection("users").where({ email });

      if (email) {
        if (email === user[0].email) {
          isEmail = user[0].email;
        } else {
          if (checkEmail.length >= 1) {
            return response.json({ error: "E-mail já registrado." });
          } else {
            isEmail = email;
          }
        }
      } else {
        return response.json({ error: "Digite um email." });
      }

      if (password) {
        if (await bcrypt.compare(password, user[0].password)) {
          if (newPassword === confirmNewPassword) {
            const salt = bcrypt.genSaltSync(10);
            const passwordCrypt = bcrypt.hashSync(newPassword, salt);
            isPassword = passwordCrypt;
          } else {
            return response.json({ error: "Senha não coincidem." });
          }
        } else {
          return response.json({ error: "Senha invalida." });
        }
      } else {
        isPassword = user[0].password;
      }

      if (username) {
        if (username === user[0].username) {
          isUsername = user[0].username;
        } else {
          if (checkUsername.length >= 1) {
            return response.json({ error: "Usuário já registrado." });
          } else {
            isUsername = username;
          }
        }
      } else {
        return response.json({ error: "Digite um email." });
      }

      await connection("users")
        .update({
          email: isEmail,
          username: isUsername,
          password: isPassword,
        })
      .where({ id: request.userId });
      
      return response.json({ message: ConstantSuccess.ACCOUNT_SUCCESSFULLY_UPDATED });
    } catch (ex) {
      next(ex);
    }
  }

  async deleteScheduleById(request, response, next) {
    try {
      const { id } = request.params;

      await connection("users").delete().where({ id });

      return response.json({ message: "Usuário deletado com sucesso" });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new ScheduleController();
const bcrypt = require("bcrypt");
const moment = require("moment");

const connection = require("../../database/connection");
const { ConstantSuccess } = require("../../app/constants");

moment.locale("pt-br");

class UserController {
  async findUserById(request, response, next) {
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
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(request, response, next) {
    try {
      const { username, email, password, newPassword, confirmNewPassword } = request.body;

      const user = await connection("users").select("*").where({ id: request.userId });
      const checkUsername = username && await connection("users").select("*").where({ username });
      const checkEmail = email && await connection("users").select("*").where({ email });

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
    } catch (error) {
      next(error);
    }
  }

  async deleteUserById(request, response, next) {
    try {
      const { id } = request.params;

      return response.json({ user: id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
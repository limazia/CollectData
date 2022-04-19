const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const moment = require("moment");

const connection = require("../../database/connection");
const { AuthConfig } = require("../../config");

moment.locale("pt-br");

class AuthController {
  async createUser(request, response, next) {
    try {
      const { name, email, password, confirmPassword } = request.body;
      const user = await connection("users").select("*").where({ email });
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
    } catch (error) {
      next(error);
    }
  }

  async loginUser(request, response, next) {
    try {
      const { email, password } = request.body;
      const user = await connection("users").select("*").where({ email });

      if (!email) {
        return response.json({ error: "Digite um email" });
      }

      if (!password) {
        return response.json({ error: "Digite uma senha" });
      }

      if (user.length >= 1) {
        if (!(await bcrypt.compare(password, user[0].password))) {
          return response.send({ error: "Email e/ou senha invalidos!" });
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
    } catch (error) {
      next(error);
    }
  }

  async account(request, response, next) {
    try {
      const results = await connection("users").where({ id: request.userId });

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

  async sessionUser(request, response, next) {
    try {
      return response.json({ id: request.userId });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(request, response, next) {
    try {
      return response.json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
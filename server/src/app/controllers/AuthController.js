const cryptoRandomString = require("crypto-random-string");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = require("../../database/connection");
const { AuthConfig } = require("../../config");

class AuthController {
  async login(request, response, next) {
    try {
      const { email, password } = request.body;
      const user = await connection("professionals").select("*").where({ email });

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

  async register(request, response, next) {
    try {
      const { name, email, password, confirmPassword } = request.body;
      const user = await connection("professionals").select("*").where({ email });
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

      await connection("professionals").insert({
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
 
  async logout(request, response, next) {
    try {
      return response.json({ status: true });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new AuthController();
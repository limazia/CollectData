const connection = require("../../database/connection");
const moment = require("../../helpers/moment.helper");
 
class ProfessionalController {
  async listAllProfessionals(request, response, next) {
    try {
      const { page = 1, limit = 10 } = request.query;
      const professionals = await connection("professionals")
        .select("*")
        .orderBy("createdAt", "asc")
        .limit(limit)
        .offset(limit * page - limit);
      const professionalsCount = await connection("professionals");

      const serializedItems = professionals.map((item) => {
        const {
          id,
          name,
          email,
          identity_type,
          identity_card,
          telephone,
          area_activity,
          primary_user,
          createdAt,
        } = item;

        return {
          id: id ? id : null,
          name: name ? name : null,
          email: email ? email : null,
          identity_type: identity_type ? identity_type : null,
          identity_card: identity_card ? identity_card : null,
          telephone: telephone ? telephone : null,
          area_activity: area_activity ? area_activity : null,
          primary_user: primary_user === "1" ? true : false,
          createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
        };
      });

      if (professionals.length <= 0) {
        return response.json({ results: [] });
      }

      return response.json({
        total: professionalsCount.length,
        limit: parseFloat(limit),
        page: parseFloat(page),
        pages: Math.ceil(professionalsCount.length / limit),
        results: serializedItems
      });
    } catch (ex) {
      next(ex);
    }
  }

  async createProfessional(request, response, next) {
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
        password: passwordCrypt,
      });

      return response.json({ message: "Conta criada com sucesso" });
    } catch (ex) {
      next(ex);
    }
  }

  async findProfessionalById(request, response, next) {
    try {
      const { id } = request.params;
      const results = await connection("professionals").where({ id });

      if (results.length >= 1) {
        const { id, name, email, createdAt } = results[0];

        return response.json({
          id,
          name,
          avatar:
            "https://www.tutorialrepublic.com/examples/images/avatar/2.jpg",
          email,
          created_at: moment(createdAt).format("LLL"),
          permissions: ["login_admin", "view_cv", "edit_cv"],
        });
      } else {
        response.json({ error: "Nenhum usuário foi encontrado com este id." });
      }
    } catch (ex) {
      next(ex);
    }
  }

  async updateProfessionalById(request, response, next) {
    try {
      const { username, email, password, newPassword, confirmNewPassword } =
        request.body;

      const user = await connection("professionals")
        .select("*")
        .where({ id: request.userId });
      const checkUsername =
        username && (await connection("professionals").select("*").where({ username }));
      const checkEmail =
        email && (await connection("professionals").select("*").where({ email }));

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

      await connection("professionals")
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

  async deleteProfessionalById(request, response, next) {
    try {
      const { id } = request.params;

      const result = await connection("professionals").delete().where({ id });

      if (result) {
        return response.json({ message: "Cliente deletado com sucesso" });
      } else {
        return response.json({ error: "Não foi possivel excluir o cliente" });
      }
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new ProfessionalController();

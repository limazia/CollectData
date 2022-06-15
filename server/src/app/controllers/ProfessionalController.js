const cryptoRandomString = require("crypto-random-string");
const bcrypt = require("bcrypt");

const moment = require("../../helpers/moment.helper");
const connection = require("../../database/connection");
const constant = require("../../app/constants");

class ProfessionalController {
  async listAllProfessionals(request, response, next) {
    try {
      const professionals = await connection("professionals").orderBy("createdAt", "asc")

      const serializedItems = professionals.map((item) => {
        const {
          id,
          name,
          surname,
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
          surname: surname ? surname : null,
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

      return response.json({ results: serializedItems });
    } catch (ex) {
      next(ex);
    }
  }

  async createProfessional(request, response, next) {
    try {
      const { professionalData } = request.body;
      const {
        name,
        surname,
        email,
        telephone,
        birth_date,
        identity_type,
        identity_card,
        area_activity,
        password,
        confirmPassword,
      } = professionalData;

      const user = await connection("professionals").where({ email });
      const salt = bcrypt.genSaltSync(10);
      const passwordCrypt = bcrypt.hashSync(password, salt);
      const id = cryptoRandomString({ length: 15 });

      if (!name) {
        return response.json({ error: constant.error.input.ENTER_AN_NAME });
      }

      if (!surname) {
        return response.json({ error: constant.error.input.ENTER_AN_SURNAME });
      }

      if (!email) {
        return response.json({ error: constant.error.input.ENTER_AN_EMAIL });
      } else {
        if (user.length > 0) {
          return response.json({ error: constant.error.form.EMAIL_ALREADY_REGISTERED });
        }
      }

      if (!password) {
        return response.json({ error: constant.error.input.ENTER_AN_PASSWORD });
      }

      if (password != confirmPassword) {
        return response.json({ error: constant.error.form.PASSWORDS_DONT_MATCH });
      }

      await connection("professionals").insert({
        id,
        name,
        surname,
        email,
        password: passwordCrypt,
        telephone,
        birth_date,
        identity_type,
        identity_card,
        area_activity,
      });

      return response.json({ message: constant.success.SUCCESSFULLY_REGISTERED });
    } catch (ex) {
      next(ex);
    }
  }

  async findProfessionalById(request, response, next) {
    try {
      const { id } = request.params;
      const professional = await connection("professionals").where({ id });

      if (professional.length >= 1) {
        const {
          id,
          name,
          surname,
          email,
          identity_type,
          identity_card,
          telephone,
          area_activity,
          primary_user,
          createdAt,
        } = professional[0];

        return response.json({
          results: {
            id: id ? id : null,
            name: name ? name : null,
            surname: surname ? surname : null,
            email: email ? email : null,
            identity_type: identity_type ? identity_type : null,
            identity_card: identity_card ? identity_card : null,
            telephone: telephone ? telephone : null,
            area_activity,
            primary_user: primary_user ? primary_user : null,
            createdAt: moment(createdAt).format("LLL"),
          }
        });
      }
      
      response.json({ error: constant.error.NO_USER_FOUND_WITH_THIS_ID });
    } catch (ex) {
      next(ex);
    }
  }

  async updateProfessionalById(request, response, next) {
    try {
      return response.json({ message: "soon" });
    } catch (ex) {
      next(ex);
    }
  }

  async deleteProfessionalById(request, response, next) {
    try {
      const { id } = request.params;
      const professional = await connection("professionals").where({ id });

      if (professional.length >= 1) {
        await connection("professionals").delete().where({ id });

        return response.json({ message: constant.success.RECORD_DELETED });
      }

      return response.json({ error: constant.error.NO_USER_FOUND_WITH_THIS_ID });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new ProfessionalController();

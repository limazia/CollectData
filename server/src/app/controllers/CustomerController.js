const bcrypt = require("bcrypt");
const moment = require("moment");
const cryptoRandomString = require("crypto-random-string");

const connection = require("../../database/connection");
const constant = require("../../app/constants");

moment.locale("pt-br");

class CustomerController {
  async listAllCustomers(request, response, next){
    try {
      const { page = 1, limit = 10 } = request.query;
      const customers = await connection("customers")
        .select("*")
        .orderBy("createdAt", "desc")
        .limit(limit)
        .offset(limit * page - limit);
      const customersCount = await connection("customers");

      const serializedItems = customers.map((item) => {
        const {
          id,
          name,
          surname,
          email,
          telephone,
          birth_date,
          identity_type,
          identity_card,
          zipcode,
          address,
          district,
          complement,
          city,
          state,
          pressure,
          diabetic,
          hemophiliac,
          healing,
          eplsepsis,
          fainting,
          allergy_medication,
          hepatitis,
          createdAt,
        } = item;

        return {
          id: id ? id : null,
          name: name ? name : null,
          surname: surname ? surname : null,
          email: email ? email : null,
          telephone: telephone ? telephone : null,
          birth_date: birth_date ? birth_date : null,
          identity_type: identity_type ? identity_type : null,
          identity_card: identity_card ? identity_card : null,
          zipcode: zipcode ? zipcode : null,
          address: address ? address : null,
          district: district ? district : null,
          complement: complement ? complement : null,
          city: city ? city : null,
          state: state ? state : null,
          pressure: pressure === 1 ? true : false,
          diabetic: diabetic === 1 ? true : false,
          hemophiliac: hemophiliac === 1 ? true : false,
          healing: healing === 1 ? true : false,
          eplsepsis: eplsepsis === 1 ? true : false,
          fainting: fainting === 1 ? true : false,
          allergy_medication: allergy_medication ? allergy_medication : null,
          hepatitis: hepatitis ? hepatitis : null,
          createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
        };
      });

      if (customers.length <= 0) {
        return response.json({ results: [] });
      }

      return response.json({
        total: customersCount.length,
        limit: parseFloat(limit),
        page: parseFloat(page),
        pages: Math.ceil(customersCount.length / limit),
        results: serializedItems
      });
    } catch (ex) {
      next(ex);
    }
  }

  async createCustomer(request, response, next) {
    try {
      const { customerData, customerAddress, medicalRecord } = request.body;
      const { name, surname, email, telephone, birth_date, identity_type, identity_card } = customerData;
      const { zipcode, address, district, complement, city, state } = customerAddress;
      const { pressure, diabetic, hemophiliac, healing, eplsepsis, fainting, allergy_medication, hepatitis } = medicalRecord;
 
      const user = await connection("customers").select("*").where({ email });
      const userCard = await connection("customers").select("*").where({ identity_card });
      const id = cryptoRandomString({ length: 15 });

      if (!email) {
        return response.json({ error: "Digite um email" });
      } else {
        if (user.length > 0) {
          return response.json({ error: "Email já registrado" });
        }
      }

      if (!identity_card) {
        return response.json({ error: "Digite um documento" });
      } else {
        if (userCard.length > 0) {
          return response.json({ error: "Documento já registrado" });
        }
      }

      await connection("customers").insert({
        id,
        name,
        surname,
        email,
        telephone,
        birth_date,
        identity_type,
        identity_card,
        zipcode,
        address,
        district,
        complement,
        city,
        state,
        pressure,
        diabetic,
        hemophiliac,
        healing,
        eplsepsis,
        fainting,
        allergy_medication,
        hepatitis,
      });

      return response.json({ message: "Cliente cadastrado com sucesso" });
    } catch (ex) {
      next(ex);
    }
  }

  async findCustomerById(request, response, next) {
    try {
      const { id } = request.params;
      const results = await connection("customers").where({ id });

      if (results.length >= 1) {
        const {
          id,
          name,
          surname,
          email,
          telephone,
          birth_date,
          identity_type,
          identity_card,
          zipcode,
          address,
          district,
          complement,
          city,
          state,
          pressure,
          diabetic,
          hemophiliac,
          healing,
          eplsepsis,
          fainting,
          allergy_medication,
          hepatitis,
          createdAt,
        } = results[0];

        return response.json({
          id: id ? id : null,
          name: name ? name : null,
          surname: surname ? surname : null,
          email: email ? email : null,
          telephone: telephone ? telephone : null,
          birth_date: birth_date ? birth_date : null,
          identity_type: identity_type ? identity_type : null,
          identity_card: identity_card ? identity_card : null,
          zipcode: zipcode ? zipcode : null,
          address: address ? address : null,
          district: district ? district : null,
          complement: complement ? complement : null,
          city: city ? city : null,
          state: state ? state : null,
          pressure: pressure === 1 ? true : false,
          diabetic: diabetic === 1 ? true : false,
          hemophiliac: hemophiliac === 1 ? true : false,
          healing: healing === 1 ? true : false,
          eplsepsis: eplsepsis === 1 ? true : false,
          fainting: fainting === 1 ? true : false,
          allergy_medication: allergy_medication ? allergy_medication : null,
          hepatitis: hepatitis ? hepatitis : null,
          createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
        });
      } else {
        response.json({ error: "Nenhum cliente foi encontrado com este id." });
      }
    } catch (ex) {
      next(ex);
    }
  }

  async updateCustomerById(request, response, next) {
    try {
      const { username, email, password, newPassword, confirmNewPassword } = request.body;

      const user = await connection("customers").select("*").where({ id: request.userId });
      const checkUsername = username && await connection("customers").select("*").where({ username });
      const checkEmail = email && await connection("customers").select("*").where({ email });

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

      await connection("customers")
        .update({
          email: isEmail,
          username: isUsername,
          password: isPassword,
        })
      .where({ id: request.userId });
      
      return response.json({ message: constant.success.ACCOUNT_SUCCESSFULLY_UPDATED });
    } catch (ex) {
      next(ex);
    }
  }

  async deleteCustomerById(request, response, next) {
    try {
      const { id } = request.params;
      
      await connection("customers").delete().where({ id });

      return response.json({ message: "Cliente deletado com sucesso" });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new CustomerController();
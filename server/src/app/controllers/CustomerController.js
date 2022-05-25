const cryptoRandomString = require("crypto-random-string");

const moment = require("../../helpers/moment.helper");
const connection = require("../../database/connection");
const constant = require("../../app/constants");

class CustomerController {
  async listAllCustomers(request, response, next){
    try {
      const customers = await connection("customers").orderBy("createdAt", "desc")

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

      return response.json({ results: serializedItems });
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
 
      const user = await connection("customers").where({ email });
      const userCard = await connection("customers").where({ identity_card });
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
          results: {
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
          },
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
      return response.json({ message: "soon" });
    } catch (ex) {
      next(ex);
    }
  }

  async deleteCustomerById(request, response, next) {
    try {
      const { id } = request.params;
      const customer = await connection("customers").where({ id });
  
      if (customer.length >= 1) {
        await connection("customers").delete().where({ id });
  
        return response.json({ message: "Cliente deletado com sucesso" });
      }
  
      return response.json({ error: "Nenhum cliente foi encontrado com este ID" });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new CustomerController();
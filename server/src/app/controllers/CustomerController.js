const cryptoRandomString = require("crypto-random-string");
const fs = require("fs");
const path = require("path");

const {
  updateCustomerData,
  updateCustomerAddress,
  updateMedicalRecord,
} = require("../../helpers/update.helper");

const moment = require("../../helpers/moment.helper");
const connection = require("../../database/connection");
const constant = require("../../app/constants");

class CustomerController {
  async listAllCustomers(request, response, next){
    try {
      const customers = await connection("customers")
        .select([
          "customers.*",
          "professionals.id as p_id",
          "professionals.name as p_name",
          "professionals.surname as p_surname",
        ])
        .leftJoin("professionals", "professionals.id", "=", "customers.created_by")
        .orderBy("createdAt", "desc")

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
          p_id,
          p_name,
          p_surname,
          createdAt,
        } = item;

        const docSavePath = path.resolve(__dirname, "../../../uploads/contracts", id);
        const files_count = fs.readdirSync(docSavePath).length;

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
          created_by: {
            professional_id: p_id ? p_id : null,
            professional_name: p_id ? `${p_name} ${p_surname}` : null
          },
          files_count: files_count ? files_count : 0,
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
      const { customerData, customerAddress, medicalRecord, professionalDetails } = request.body;
      const { name, surname, email, telephone, birth_date, identity_type, identity_card } = customerData;
      const { zipcode, address, district, complement, city, state } = customerAddress;
      const { pressure, diabetic, hemophiliac, healing, eplsepsis, fainting, allergy_medication, hepatitis } = medicalRecord;
      const { professional_id } = professionalDetails;

      const user = await connection("customers").where({ email });
      const userCard = await connection("customers").where({ identity_card });
      const id = cryptoRandomString({ length: 15 });
      const userPath = path.resolve(__dirname, "../../../", "uploads", "contracts", id);

      if (!email) {
        return response.json({ error: constant.error.input.ENTER_AN_EMAIL });
      } else {
        if (user.length > 0) {
          return response.json({ error: constant.error.form.EMAIL_ALREADY_REGISTERED });
        }
      }

      if (!identity_card) {
        return response.json({ error: constant.error.input.ENTER_AN_DOCUMENT });
      } else {
        if (userCard.length > 0) {
          return response.json({ error: constant.error.form.DOCUMENT_ALREADY_REGISTERED });
        }
      }

      if (!fs.existsSync(userPath)){
        fs.mkdirSync(userPath);
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
        created_by: professional_id
      });

      return response.json({ message: constant.success.SUCCESSFULLY_REGISTERED });
    } catch (ex) {
      next(ex);
    }
  }

  async findCustomerById(request, response, next) {
    try {
      const { id } = request.params;
      const results = await connection("customers")
        .select([
          "customers.*",
          "professionals.id as p_id",
          "professionals.name as p_name",
          "professionals.surname as p_surname",
        ])
        .leftJoin("professionals", "professionals.id", "=", "customers.created_by")
        .where("customers.id", id)
        .orderBy("createdAt", "desc");
      
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
          p_id,
          p_name,
          p_surname,
          updateAt,
          createdAt
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
            created_by: {
              professional_id: p_id ? p_id : null,
              professional_name: p_id ? `${p_name} ${p_surname}` : null
            },
            updateAt: moment(updateAt).format("DD [de] MMMM, YYYY"),
            createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
          },
        });
      } else {
        response.json({ error: constant.error.NO_USER_FOUND_WITH_THIS_ID });
      }
    } catch (ex) {
      next(ex);
    }
  }

  async updateCustomerById(request, response, next) {
    try {
      const { scope } = request.params;
      const allowedScopes = ["customerData", "customerAddress", "medicalRecord"];

      if (allowedScopes.includes(scope)) {
        switch (scope) {
          case "customerData":
            updateCustomerData(request, response, next);
            break;
          case "customerAddress":
            updateCustomerAddress(request, response, next);
            break;
          case "medicalRecord":
            updateMedicalRecord(request, response, next);
            break;
          default:
            response.json({ error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE });
        }
      } else {
        return response.json({ error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE });
      }
    } catch (ex) {
      next(ex);
    }
  }

  async deleteCustomerById(request, response, next) {
    try {
      const { id } = request.params;
      const customer = await connection("customers").where({ id });
      const userPath = path.resolve(__dirname, "../../../", "uploads", "contracts", id);
  
      if (customer.length >= 1) {
        await connection("customers").delete().where({ id });
        fs.rmSync(userPath, { recursive: true });
  
        return response.json({ message: constant.success.RECORD_DELETED });
      }
  
      return response.json({ error: constant.error.NO_USER_FOUND_WITH_THIS_ID });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new CustomerController();
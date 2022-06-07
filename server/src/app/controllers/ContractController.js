const cryptoRandomString = require("crypto-random-string");
const fs = require("fs");
const path = require("path");
const imageSize = require("image-size");

const { TemplateHandler, MimeType } = require("easy-template-x");

const moment = require("../../helpers/moment.helper");
const connection = require("../../database/connection");
const { AppConfig } = require("../../config");
const constant = require("../../app/constants");

class ContractController {
  async listAllContract(request, response, next) {
    try {
      const { id } = request.params;
      const contracts = await connection("contracts")
      .select([
        "contracts.*",
        "customers.id as c_id",
        "customers.name as c_name",
        "customers.surname as c_surname",
        "customers.created_by  as c_created_by",
        "professionals.id as p_id",
        "professionals.name as p_name",
        "professionals.surname as p_surname",
      ])
      .leftJoin("customers", "customers.id", "=", "contracts.customer_id")
      .leftJoin("professionals", "professionals.id", "=", "customers.created_by")
      .where("customers.id", id).orderBy("createdAt", "desc");

      const serializedItems = contracts.map((item) => {
        const {
          id,
          title,
          thumbnail,
          thumbnail_type,
          thumbnail_width,
          thumbnail_height,
          thumbnail_size,
          file,
          customer_id,
          p_id,
          p_name,
          p_surname,
          createdAt
        } = item;

        return {
          id,
          title,
          thumbnail: `${AppConfig.server}/gallery/${thumbnail}`,
          thumbnail_type,
          thumbnail_width,
          thumbnail_height,
          thumbnail_size,
          file: `${AppConfig.server}/contracts/${customer_id}/${file}`,
          created_by: {
            professional_id: p_id ? p_id : null,
            professional_name: p_id ? `${p_name} ${p_surname}` : null
          },
          createdAt: moment(createdAt).format("LLL"),
        };
      });

      if (contracts.length <= 0) {
        return response.json({ results: [] });
      }

      return response.json({ results: serializedItems });
    } catch (ex) {
      next(ex);
    }
  }

  async createContract(request, response, next) {
    try {
      const { id, title } = request.body;
      const { filename, mimetype, size } = request.file;

      const templatePath = path.resolve(__dirname, "../../templates", "contract.docx");
      const imagePath = path.resolve(__dirname, "../../../uploads/gallery", filename);
      const docSavePath = path.resolve(__dirname, "../../../uploads/contracts", id);
      const templateFile = fs.readFileSync(templatePath);

      const customer = await connection("customers")
        .select([
          "customers.*",
          "professionals.name as p_name",
          "professionals.surname as p_surname",
        ])
        .leftJoin("professionals", "professionals.id", "=", "customers.created_by")
        .where("customers.id", id);
      
      const dimensions = await imageSize(imagePath);

      const { width, height } = dimensions;
      
      const contract_id = cryptoRandomString({ length: 13 });
      const thumbnail = filename;
      const thumbnail_type = mimetype;
      const thumbnail_width = width;
      const thumbnail_height = height;
      const thumbnail_size = size;
      const file = `${cryptoRandomString({ length: 9, type: 'base64' })}_${moment().format("DD[_]MM[_]YYYY")}`;

      const {
        name,
        surname,
        p_name,
        p_surname,
      } = customer[0];
      const date = moment().format('LL');
      
      const data = {
        rowDate: date,
        rowCustomerName: `${name} ${surname}`,
        rowProfessionalName: `${p_name} ${p_surname}`,
        "rowContractImage": {
          _type: "image",
          source: fs.readFileSync(imagePath),
          format: MimeType.Jpeg,
          width,
          height
        }
      };

      const handler = new TemplateHandler();
      const doc = await handler.process(templateFile, data);

      fs.writeFileSync(`${docSavePath}/${file}.docx`, doc);

      await connection("contracts").insert({
        id: contract_id,
        title,
        thumbnail,
        thumbnail_type,
        thumbnail_width,
        thumbnail_height,
        thumbnail_size,
        file: `${file}.docx`,
        customer_id: id,
      });

      return response.json({ message: constant.success.SUCCESSFULLY_REGISTERED });
    } catch (ex) {
      next(ex);
    }
  }

  async deleteContractById(request, response, next) {
    try {
      const { id } = request.params;
      const customer = await connection("customers").where({ id });
  
      if (customer.length >= 1) {
        await connection("customers").delete().where({ id });
  
        return response.json({ message: "Cliente deletado com sucesso" });
      }
  
      return response.json({ error: constant.error.NO_USER_FOUND_WITH_THIS_ID });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new ContractController();
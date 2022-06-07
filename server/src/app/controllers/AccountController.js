const moment = require("moment");

const connection = require("../../database/connection");
const {
  updateName,
  updateEmail,
  updateIdentityCard,
  updateTelephone,
  updatePassword,
} = require("../../helpers/update.helper");
const constant = require("../constants");

moment.locale("pt-br");

class AccountController {
  async account(request, response, next) {
    try {
      const results = await connection("professionals").where({ id: request.userId });

      if (results.length >= 1) {
        const {
          id,
          name,
          surname,
          email,
          telephone,
          identity_type,
          identity_card,
          area_activity,
          primary_user,
          updateAt,
          createdAt,
        } = results[0];

        return response.json({
          id: id ? id : null,
          name: name ? name : null,
          surname: surname ? surname : null,
          email: email ? email : null,
          telephone: telephone ? telephone : null,
          identity_type: identity_type ? identity_type : null,
          identity_card: identity_card ? identity_card : null,
          area_activity: area_activity ? area_activity : null,
          primary_user: primary_user >= 1 ? true : false,
          update_at: moment(updateAt).format("LL"),
          created_at: moment(createdAt).format("LL"),
        });
      } else {
        response.json({ error: constant.error.NO_USER_FOUND_WITH_THIS_ID });
      }
    } catch (ex) {
      next(ex);
    }
  }

  async updateByScope(request, response, next) {
    try {
      const { scope } = request.params;
      const allowedScopes = ["name", "email", "identity_card", "telephone", "password"];

      if (allowedScopes.includes(scope)) {
        switch (scope) {
          case "name":
            updateName(request, response, next);
            break;
          case "email":
            updateEmail(request, response, next);
            break;
          case "identity_card":
            updateIdentityCard(request, response, next);
            break;
          case "telephone":
            updateTelephone(request, response, next);
            break;
          case "password":
            updatePassword(request, response, next);
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
}

module.exports = new AccountController();
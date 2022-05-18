const bcrypt = require("bcrypt");

const connection = require("../database/connection");
const constant = require("../app/constants");

async function updateName(request, response, next) {
  try {
    const { id } = request.params;
    const { name } = request.body;

    const user = await connection("professionals").select("*").where({ id });
    let isName = "";

    if (name) {
      if (name === user[0].name) {
        isName = user[0].name;
      } else {
        isName = name;
      }
    } else {
      return response.json({ error: "Digite um nome" });
    }

    await connection("professionals").update({ name: isName }).where({ id });

    return response.json({ message: constant.success.NAME_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updateEmail(request, response, next) {
  try {
    const { id } = request.params;
    const { email } = request.body;

    const user = await connection("professionals").select("*").where({ id });
    const checkEmail = email && (await connection("professionals").select("*").where({ email }));
    let isEmail = "";

    if (email) {
      if (email === user[0].email) {
        isEmail = user[0].email;
      } else {
        if (checkEmail.length >= 1) {
          return response.json({ error: "Email já registrado" });
        } else {
          isEmail = email;
        }
      }
    } else {
      return response.json({ error: "Digite um email" });
    }

    await connection("professionals").update({ email: isEmail }).where({ id });

    return response.json({ message: constant.success.EMAIL_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updateIdentityCard(request, response, next) {
  try {
    const { id } = request.params;
    const { identity_type, identity_card } = request.body;

    const user = await connection("professionals").select("*").where({ id });
    const checkIdentity = identity_card && (await connection("professionals").select("*").where({ identity_card }));
    let isIdentityCard = "";

    if (identity_card) {
      if (identity_card === user[0].identity_card) {
        isIdentityCard = user[0].identity_card;
      } else {
        if (checkIdentity.length >= 1) {
          return response.json({ error: "Documento já registrado" });
        } else {
          isIdentityCard = identity_card;
        }
      }
    } else {
      return response.json({ error: "Digite o número de documento" });
    }

    await connection("professionals").update({
      identity_type,
      identity_card: isIdentityCard,
      }).where({ id });

    return response.json({ message: constant.success.IDENTITY_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updateTelephone(request, response, next) {
  try {
    const { id } = request.params;
    const { telephone } = request.body;

    const user = await connection("professionals").select("*").where({ id });
    let isTelephone = "";

    if (telephone) {
      if (telephone === user[0].telephone) {
        isTelephone = user[0].telephone;
      } else {
        isTelephone = telephone;
      }
    } else {
      return response.json({ error: "Digite um telefone" });
    }

    await connection("professionals").update({ telephone: isTelephone }).where({ id });

    return response.json({ message: constant.success.TELEPHONE_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updatePassword(request, response, next) {
  try {
    const { id } = request.params;
    const { password, newPassword, confirmPassword } = request.body;

    const user = await connection("professionals").select("*").where({ id });
    let isPassword = "";

    if (password && newPassword && confirmPassword) {
      if (await bcrypt.compare(password, user[0].password)) {
        if (newPassword === confirmPassword) {
          const salt = bcrypt.genSaltSync(10);
          const passwordCrypt = bcrypt.hashSync(newPassword, salt);
          isPassword = passwordCrypt;
        } else {
          return response.json({ error: "Senha não coincidem" });
        }
      } else {
        return response.json({ error: "Senha invalida" });
      }
    }

    await connection("professionals").update({ password: isPassword }).where({ id });

    return response.json({ message: constant.success.PASSWORD_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}
 
module.exports = {
  updateName,
  updateEmail,
  updateIdentityCard,
  updateTelephone,
  updatePassword,
};
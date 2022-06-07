const bcrypt = require("bcrypt");

const connection = require("../database/connection");
const constant = require("../app/constants");

async function updateName(request, response, next) {
  try {
    const { id } = request.params;
    const { name, surname } = request.body;

    const user = await connection("professionals").where({ id });
    let isName = "";
    let isSurname = "";

    if (name) {
      if (name === user[0].name) {
        isName = user[0].name;
      } else {
        isName = name;
      }
    } else {
      return response.json({ error: "Digite um nome" });
    }

    if (surname) {
      if (surname === user[0].surname) {
        isSurname = user[0].surname;
      } else {
        isSurname = surname;
      }
    } else {
      return response.json({ error: "Digite um sobrenome" });
    }

    await connection("professionals").update({ name: isName, surname: isSurname }).where({ id });

    return response.json({ message: constant.success.NAME_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updateEmail(request, response, next) {
  try {
    const { id } = request.params;
    const { email } = request.body;

    const user = await connection("professionals").where({ id });
    const checkEmail = email && (await connection("professionals").where({ email }));
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

    const user = await connection("professionals").where({ id });
    const checkIdentity = identity_card && (await connection("professionals").where({ identity_card }));
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

    const user = await connection("professionals").where({ id });
    let isTelephone = "";

    if (telephone) {
      if (telephone === user[0].telephone) {
        isTelephone = user[0].telephone;
      } else {
        isTelephone = telephone;
      }
    } else {
      return response.json({ error: constant.error.input.ENTER_AN_TELEPHONE });
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

    const user = await connection("professionals").where({ id });
    let isPassword = "";

    if (password && newPassword && confirmPassword) {
      if (await bcrypt.compare(password, user[0].password)) {
        if (newPassword === confirmPassword) {
          const salt = bcrypt.genSaltSync(10);
          const passwordCrypt = bcrypt.hashSync(newPassword, salt);
          isPassword = passwordCrypt;
        } else {
          return response.json({ error: constant.error.form.PASSWORDS_DONT_MATCH });
        }
      } else {
        return response.json({ error: constant.error.form.INVALID_PASSWORD });
      }
    }

    await connection("professionals").update({ password: isPassword }).where({ id });

    return response.json({ message: constant.success.PASSWORD_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updateCustomerData(request, response, next) {
  try {
    const { id } = request.params;
    const { customerData } = request.body;

    await connection("customers").update(customerData).where({ id });

    return response.json({ message: constant.success.ACCOUNT_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updateCustomerAddress(request, response, next) {
  try {
    const { id } = request.params;
    const { customerAddress } = request.body;

    await connection("customers").update(customerAddress).where({ id });

    return response.json({ message: constant.success.ACCOUNT_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updateMedicalRecord(request, response, next) {
  try {
    const { id } = request.params;
    const { medicalRecord } = request.body;

    console.log(medicalRecord)

    await connection("customers").update(medicalRecord).where({ id });

    return response.json({ message: constant.success.ACCOUNT_SUCCESSFULLY_UPDATED });
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
  updateCustomerData,
  updateCustomerAddress,
  updateMedicalRecord,
};
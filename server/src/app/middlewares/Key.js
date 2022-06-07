const constant = require("../../app/constants");

class Key {
  async Authentication(request, response, next) {
    const authHeader = request.headers["key"];

    if (!authHeader) {
      return response.json({ error: constant.error.API_KEY_MISSING });
    }

    try {
      if (authHeader === process.env.API_KEY) {      
        return next();
      } else {
        return response.json({ error: constant.error.INVALID_API_KEY });
      }
    } catch (err) {
      return response.json({ error: constant.error.ERROR_UNKNOWN });
    }
  }
}

module.exports = new Key();
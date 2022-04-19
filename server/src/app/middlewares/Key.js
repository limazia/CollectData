class Key {
  async Authentication(request, response, next) {
    const authHeader = request.headers["key"];

    if (!authHeader) {
      return response.json({ error: "Faltando chave de API" });
    }

    try {
      if (authHeader === process.env.API_KEY) {      
        return next();
      }
    } catch (err) {
      return response.json({ error: "Chave de API inválida" });
    }
  }
}

module.exports = new Key();
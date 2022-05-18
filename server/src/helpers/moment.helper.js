const moment = require("moment");

moment.locale("pt-br"); // setar o locale para "pt-br" (Português)

// mudar os nomes dos meses para o locale "pt-br"
moment.updateLocale("pt-br", {
  months: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
});

module.exports = moment;
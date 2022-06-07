const moment = require("moment");
const cryptoRandomString = require("crypto-random-string");

const connection = require("../../database/connection");
const constant = require("../constants");

moment.locale("pt-br");

class ScheduleController {
  async listAllSchedules(request, response, next) {
    try {
      return response.json({ data: null });
    } catch (ex) {
      next(ex);
    }
  }

  async createSchedule(request, response, next) {
    try {
      return response.json({ data: null });
    } catch (ex) {
      next(ex);
    }
  }

  async findScheduleById(request, response, next) {
    try {
      return response.json({ data: null });
    } catch (ex) {
      next(ex);
    }
  }

  async updateScheduleById(request, response, next) {
    try {
      return response.json({ data: null });
    } catch (ex) {
      next(ex);
    }
  }

  async deleteScheduleById(request, response, next) {
    try {
      return response.json({ data: null });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new ScheduleController();
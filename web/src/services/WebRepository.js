import api from "./api";

export default {
  getProfessionals: async (page = 1, limit = 10) => {
    try {
      const { data } = await api.get(`/api/professionals?page=${page}&limit=${limit}`);

      return data;
    } catch (ex) {
      console.error("[GET /professionals] > it was not possible to collect data from the api");
    }
  },

  getCustomers: async (page = 1, limit = 10) => {
    try {
      const { data } = await api.get(`/api/customers?page=${page}&limit=${limit}`);

      return data;
    } catch (ex) {
      console.error("[GET /customers] > it was not possible to collect data from the api")
    }
  },

  getCustomerById: async (id) => {
    try {
      const { data } = await api.get(`/api/customers/${id}`);

      return data;
    } catch (ex) {
      console.error("[GET /customer/:id] > it was not possible to collect data from the api")
    }
  },
};
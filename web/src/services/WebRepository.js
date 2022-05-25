import api from "./api";

export default {
  getProfile: async () => {
    try {
      const { data } = await api.get("/api/me/account");

      return data;
    } catch (ex) {
      console.error("[GET /me/account] > it was not possible to collect data from the api");
    }
  },

  getProfessionals: async () => {
    try {
      const { data } = await api.get("/api/professionals");

      return data;
    } catch (ex) {
      console.error("[GET /professionals] > it was not possible to collect data from the api");
    }
  },

  getCustomers: async () => {
    try {
      const { data } = await api.get("/api/customers");

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
      console.error("[GET /customers/:id] > it was not possible to collect data from the api")
    }
  },

  getProfessionalById: async (id) => {
    try {
      const { data } = await api.get(`/api/professionals/${id}`);

      return data;
    } catch (ex) {
      console.error("[GET /professionals/:id] > it was not possible to collect data from the api")
    }
  },
};
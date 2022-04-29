/*
import api from "./api";

export default {
  getHistorys: async (page = 1) => {
    try {
      const { data: { items } } = await api.get(`/api/history?page=${page}`);

      return items;
    } catch (e) {
      //setIsLoading(true);
      //toast.error("Não foi possivel carregar a lista de jogos");
    }
  },

  getCompaniesList: async (category, page, search) => {
    try {
      const { data: { results } } = await api.get("/api/company");
      
      return results;
    } catch (e) {
      //setIsLoading(true);
      //toast.error("Não foi possivel carregar a lista de jogos");
    }
  },
};
*/
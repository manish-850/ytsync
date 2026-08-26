import { getApi } from "@/services/axios";

export const fetchSearchResults = async (query) => {
  const api = getApi();
  const { data } = await api.get(`/search?q=${query}`);
  console.log(data)
  return data.results;
};

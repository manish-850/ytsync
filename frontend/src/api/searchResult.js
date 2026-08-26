import { getApi } from "@/services/axios";

export const fetchSearchResults = async (query, setIsLoading) => {
  try {
    setIsLoading(true);
    const api = getApi();
    const { data } = await api.get(`/search?q=${query}`);
    return data.results;
    // console.log(data);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};

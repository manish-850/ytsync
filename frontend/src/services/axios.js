import axios from "axios";


let api = null;

export const getApi = () => {
  if (api) return api;
  api = axios.create({
    baseURL: "http://localhost:5000/api",
  });
  return api;
};

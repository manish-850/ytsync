import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let api = null;

export const getApi = () => {
  if (api) return api;
  api = axios.create({
    baseURL: `${BACKEND_URL}/api`,
  });
  return api;
};

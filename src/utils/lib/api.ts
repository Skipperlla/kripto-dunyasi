import axios from "axios";
const base = "https://api.coingecko.com/api/v3/coins";

const api = axios.create({
  baseURL: base,
});
export default api;

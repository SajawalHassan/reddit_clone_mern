import axios from "axios";

const api = axios.create({
  baseURL: "https://reddit-clone-api-1f12.herokuapp.com",
});

export default api;

// services/apiClient.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://nrislaw.rxchartsquare.com/",
});

export default API;

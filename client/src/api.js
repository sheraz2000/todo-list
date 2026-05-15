import axios from "axios";

const envBaseUrl = process.env.REACT_APP_API_BASE_URL?.trim();
const isBrowser = typeof window !== "undefined";
const isLocalhost =
  isBrowser &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const baseURL = envBaseUrl || (isLocalhost ? "http://localhost:8000" : "");

const api = axios.create({
  baseURL,
});

export default api;

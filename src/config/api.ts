import axios from "axios";

/* ================================
   BASE CONFIGURATION
================================ */
const API_URL = "https://useval-backend-2ab4e507f60f.herokuapp.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================================
   REQUEST INTERCEPTOR
   - Attaches token to headers
================================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   RESPONSE INTERCEPTOR
   - Handles responses globally
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Handle 401 globally
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("token");
    //   window.location.href = "/login";
    // }

    return Promise.reject(error);
  }
);

export default api;

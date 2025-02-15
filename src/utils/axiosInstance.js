import axios from "axios";

let logoutHandler = null;

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const resolveRequest = (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const resolveResponse = (response) => response;

const rejectResponse = async (error) => {
  const originalRequest = error.config;
  // console.log(error);
  // console.log(originalRequest);
  if (error.response?.status === 401) {
    try {
      console.log("access token invalid, trying to refresh access token...");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/refresh`,
        {},
        { withCredentials: true }
      );

      if (response.status === 403) {
        if (logoutHandler) {
          logoutHandler();
        }
        console.log("refresh token invalid, logging out...");
        return localStorage.removeItem("accessToken");
      }

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return api(originalRequest);
    } catch (error) {
      console.log("Error ", error);
      if (logoutHandler) {
        logoutHandler();
      }
      return Promise.reject(error);
    }
  }
  return error;
};

api.interceptors.request.use(resolveRequest);
api.interceptors.response.use(resolveResponse, rejectResponse);

export default api;

import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use((response) => {
  return response;
});

export const aPost = (url: string, data?: unknown) => {
  return axios.post(url, data);
};

export const aGet = (url: string, params?: unknown) => {
  return axios.get(url, { params });
};

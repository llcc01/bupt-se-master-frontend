import { aPost } from "./api";

export const login = (username: string, password: string, role: string) => {
  return aPost("/api/users/login", { username, password, roomId: 104 })
    .then((res) => {
      if (res.data.data?.token) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userId", res.data.data.userId);
        localStorage.setItem("fullName", res.data.data.username);
      }
      return Promise.resolve(res.data.message);
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
};

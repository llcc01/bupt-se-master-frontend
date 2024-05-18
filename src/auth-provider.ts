import { login } from "./api/user";

export const authProvider = {
  login: ({ username, password }: { username: string; password: string }) => {
    console.log("login");
    return login(username, password, "user");
  },
  logout: () => {
    console.log("logout");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () => {
    console.log("checkAuth");
    if (
      localStorage.getItem("userId") &&
      localStorage.getItem("fullName") &&
      localStorage.getItem("token")
    ) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
  checkError: () => {
    console.log("checkError");
    return Promise.resolve();
  },
  getIdentity: () => {
    console.log("getIdentity");
    if (localStorage.getItem("userId") && localStorage.getItem("fullName")) {
      return Promise.resolve({
        id: localStorage.getItem("userId") ?? "",
        fullName: localStorage.getItem("fullName") ?? "",
      });
    }
    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};

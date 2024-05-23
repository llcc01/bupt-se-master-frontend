import { getAcMasterStatus } from "./api/ac";
import { login } from "./api/user";

export const authProvider = {
  login: ({ username, password }: { username: string; password: string }) => {
    console.log("login");
    return login(username, password);
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
    return getAcMasterStatus()
      .then(() => {
        return Promise.resolve();
        // if (
        //   localStorage.getItem("userId") &&
        //   localStorage.getItem("fullName")
        // ) {
        //   return Promise.resolve();
        // }
        // return Promise.reject({ response: { status: 403 } });
      })
      .catch((e) => {
        if (e.response.status === 401) {
          return Promise.reject("请登录");
        }
        if (e.response.status === 403) {
          return Promise.reject("无权限");
        }
      });
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

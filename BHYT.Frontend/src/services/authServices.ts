import { setAuthHeader, getMethod } from "../helpers/api";
import { postMethod, clearAuthHeader } from "../helpers/api";
import { setToLocalStorage } from "../helpers/localStorage";

function utf8_to_b64(str: string): string {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export function b64_to_utf8(str: string): string {
  return decodeURIComponent(escape(window.atob(str)));
}
class AuthService {
  async login(username: string, password: string) {
    const data = {
      username,
      password,
    };
    try {
      const response = await postMethod("/Login", data);
      setToLocalStorage("token", response.token.accessToken);
      setToLocalStorage("expiredAt", response.token.expiredAt);
      setToLocalStorage("refreshToken", response.token.refreshToken);
      setToLocalStorage("account", response.account);
      setAuthHeader(response.token.accessToken);

      const userRole = await getMethod("/user/role", { username: `${username}` });
      localStorage.setItem("role", utf8_to_b64(userRole.role));
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    clearAuthHeader();
  }

  getUser() {
    const userStr = localStorage.getItem("token");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}

export default new AuthService();

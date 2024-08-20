import LoginService from "./authServices";
import { setToLocalStorage, getFromLocalStorage } from "../helpers/localStorage";
import { setAuthHeader, clearAuthHeader } from "../helpers/api";
import * as api from "../helpers/api";

// check if the token is still valid or not
function checkValidToken() {
  const token = getFromLocalStorage("token");
  const expiredAt = getFromLocalStorage("expiredAt");
  const currentDate = new Date();
  if (token && expiredAt && currentDate.toISOString() < expiredAt) {
    return true;
  } else if (!token && !expiredAt) {
    return true;
  } else {
    return false;
  }
}
//Get the new token from the API using refresh token
async function refreshToken() {
  const accessToken = getFromLocalStorage("token");
  const refreshToken = getFromLocalStorage("refreshToken");

  const body = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  try {
    const data = await api.postMethod("/login/renew-token", body);
    console.log(data);
    if (data.success === true) {
      setToLocalStorage("token", data.data.token);
      setToLocalStorage("expiredAt", data.data.expiredAt);
      setToLocalStorage("refreshToken", data.data.refreshToken);
      clearAuthHeader();
      setAuthHeader(data.data.token);

      console.log("Renew Token successfully");
    } else {
      console.log(data.message);
      clearAuthHeader();
      LoginService.logout();
    }
  } catch (error: any) {
    clearAuthHeader();
    LoginService.logout();
    window.location.href = "/login";
  }
}

export { checkValidToken, refreshToken };

import axios from "axios";
import { checkValidToken, refreshToken } from "../services/tokenServices";
import { getFromLocalStorage } from "./localStorage";
const { VITE_API_PROTOCOL, VITE_API_DOMAIN, VITE_API_PORT, VITE_API_ROOT_PATH } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: `${VITE_API_PROTOCOL}://${VITE_API_DOMAIN}:${VITE_API_PORT}/${VITE_API_ROOT_PATH}`,
  headers: {
    "Content-Type": "application/json",
    common: {
      Authorization: "Bearer " + getFromLocalStorage("token"),
    },
  },
});

async function getMethod(endpoint: string, params?: any) {
  try {
    if (!checkValidToken()) {
      await refreshToken();
    }
    const response = await axiosInstance.get(endpoint, { params: params });
    return response.data;
  } catch (error: any) {
    const errorResponseMessage = error.response.data.message;
    if (errorResponseMessage) {
      alert(errorResponseMessage);
    }
    console.error("Axios GET error:", error);
    throw error;
  }
}

async function putMethod(endpoint: string, data: any) {
  try {
    if (!checkValidToken()) {
      await refreshToken();
    }
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error: any) {
    console.error("Axios PUT error:", error);
    const errorResponseMessage = error.response.data.message;
    if (errorResponseMessage) {
      alert(errorResponseMessage);
    }
    throw error;
  }
}

async function postMethod(endpoint: string, data: any, config?: any) {
  try {
    if (!checkValidToken() && endpoint != "/login/renew-token" && endpoint !== "/Login" && endpoint !== "Register") {
      await refreshToken();
    }
    const response = await axiosInstance.post(endpoint, data, config);
    return response.data;
  } catch (error: any) {
    console.error("Axios POST error:", error);
    const errorResponseMessage = error.response.data.message;
    if (errorResponseMessage) {
      alert(errorResponseMessage);
    }
    throw error;
  }
}

async function deleteMethod(endpoint: string) {
  try {
    if (!checkValidToken()) {
      await refreshToken();
    }
    const response = await axiosInstance.delete(endpoint);
    return response.data; // If applicable, return deleted data
  } catch (error: any) {
    const errorResponseMessage = error.response.data.message;
    if (errorResponseMessage) {
      alert(errorResponseMessage);
    }
    console.error("Axios DELETE error:", error);
    throw error;
  }
}

const setAuthHeader = (accessToken: string) => {
  axiosInstance.defaults.headers.common.Authorization = "Bearer " + accessToken;
};

const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

export { getMethod, putMethod, postMethod, deleteMethod, setAuthHeader, clearAuthHeader };

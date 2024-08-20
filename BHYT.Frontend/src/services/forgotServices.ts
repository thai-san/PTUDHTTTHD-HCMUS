import axios from "axios";
const { VITE_API_PROTOCOL, VITE_API_DOMAIN, VITE_API_PORT, VITE_API_ROOT_PATH } = import.meta.env;

const baseUrl = `${VITE_API_PROTOCOL}://${VITE_API_DOMAIN}:${VITE_API_PORT}/${VITE_API_ROOT_PATH}`;

const config = {
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
};

const requestResetPassword = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/ResetPassword/request-reset`, { email: data }, config);
    return response.data;
  } catch (error: any) {
    console.error("Axios POST error:", error);
    throw error;
  }
};

const resetPassword = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/ResetPassword/reset-password`, data, config);
    return response.data;
  } catch (error: any) {
    console.error("Axios POST error:", error);
    throw error;
  }
};

export { requestResetPassword, resetPassword };

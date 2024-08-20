import axios from "axios";
const defaultsEndpoint = "https://api.vietqr.io/v2/banks";
async function getBankInfor() {
  try {
    const response = await axios.get(defaultsEndpoint);
    return response.data.data;
  } catch (error: any) {
    const errorResponseMessage = error.response.data.message;
    if (errorResponseMessage) {
      alert(errorResponseMessage);
    }
    console.error("Axios GET error:", error);
    throw error;
  }
}

export { getBankInfor };

import { getMethod, postMethod } from "../helpers/api";

const getlistCustomer = async () => {
  const response = await getMethod("/User/customer");
  return response;
};

const updateStatus = async (data: { customerId: number; newStatus: number }) => {
  const response = await postMethod("/User/update-status", data);
  return response;
};

const updateProfile = async (data: any) => {
  const response = await postMethod("/User/update-profile", data);
  return response;
};

const getProfile = async (accountId: number) => {
  const response = await getMethod("/User/get-profile?accountId=" + accountId);
  return response;
};

export { getlistCustomer, updateStatus, updateProfile, getProfile };

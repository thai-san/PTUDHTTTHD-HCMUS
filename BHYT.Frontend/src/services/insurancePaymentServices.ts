import { getMethod, deleteMethod, postMethod } from "../helpers/api";

const getPaymentRequest = async (id: string) => {
  const response = await getMethod("/InsurancePayment/" + id);
  return response;
};

const getAllPaymentRequest = async () => {
  const response = await getMethod("/InsurancePayment");
  return response;
};

const deletePaymentRequest = async (id: string) => {
  const response = await deleteMethod("/InsurancePayment/" + id);
  return response;
};

const createPaymentRequest = async (id: string, data: any) => {
  const response = await postMethod("/InsurancePayment/" + id, data);
  return response;
};

export { getPaymentRequest, getAllPaymentRequest, createPaymentRequest, deletePaymentRequest };

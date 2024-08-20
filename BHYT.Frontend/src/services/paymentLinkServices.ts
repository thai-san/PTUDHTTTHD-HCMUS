import { postMethod } from "../helpers/api";

const createPaymentLink = async (id: string, data: any) => {
  const response = await postMethod("/PaymentLink/" + id, data);
  return response;
};

const cancelSubscription = async (id: string) => {
  const response = await postMethod("/PaymentLink/cancel", id);
  return response;
};

export { createPaymentLink, cancelSubscription };

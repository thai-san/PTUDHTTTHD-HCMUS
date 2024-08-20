import { getMethod, postMethod } from "../helpers/api";

const getCustomerHealthHistory = async (id: number) => {
  const response = await getMethod("/HealthHistory/user/" + id);
  return response;
};

interface healthHistory {
  customerId: string | undefined;
  height: number | undefined;
  weight: number | undefined;
  bmi: number | undefined;
  bpm: number | undefined;
  respiratoryRate: number | undefined;
  cholesterol: number | undefined;
  bloodPressure: string;
  diseases: string | undefined;
  drug: string | undefined;
  pregnant: string | undefined;
}

const postCustomerHealthHistory = async (body: healthHistory) => {
  return await postMethod("/HealthIndicator", body);
};
export { getCustomerHealthHistory, postCustomerHealthHistory };

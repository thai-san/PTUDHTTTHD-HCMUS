import { getMethod, postMethod } from "../helpers/api";

interface ICompensationRequest {
  policyId: number;
  date: Date | null;
  amount: number;
  hoptitalName: string;
  hopitalCode: string;
  dateRequest: Date | null;
  usedServices: string;
  getOption: number;
  note: string;
  status: boolean;
}

const insertCompensation = async (data: ICompensationRequest) => {
  const response = await postMethod("/Compensation", data);
  return response;
};

const getCompensationRequestOfCustomer = async (customerId: number) => {
  const response = await getMethod("/Compensation/request?customerId=" + customerId);
  return response;
};

const updateCompensationStatus = async (data: any) => {
  const response = await postMethod("/Compensation/update-status", data);
  return response;
};

const getCompensationRequests = async () => {
  const response = await getMethod("/Compensation");
  return response;
};

export { insertCompensation, getCompensationRequestOfCustomer, updateCompensationStatus, getCompensationRequests };

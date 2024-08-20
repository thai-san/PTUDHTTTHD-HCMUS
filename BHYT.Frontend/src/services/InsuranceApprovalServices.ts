import { getMethod } from "../helpers/api";

const getInsuranceApprovalList = async () => {
  const response = await getMethod("/InsuranceApproval/request-list");
  return response;
};

const getApprovedPolicyList = async () => {
  const response = await getMethod("/InsuranceApproval/approved-policy-detail");
  return response;
};

export { getInsuranceApprovalList, getApprovedPolicyList };

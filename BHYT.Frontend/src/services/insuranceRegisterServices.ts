import { getMethod, postMethod } from "../helpers/api";

const getInsuranceTypeList = async () => {
  const response = await getMethod("/InsuranceType");
  return response;
};

interface profile {
  id: string | undefined;
  fullName: string | undefined;
  sex: number | null;
  birthday: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  bankNumber: string | undefined;
  bank: string | undefined;
}

const createInsuranceRegister = async (body: profile) => {
  const response = await postMethod("/User/update-profile", body);
  return response;
};

// const postInsuranceUserForm =async ()=>{
//   const response = await postMethod("/")
// }
export { getInsuranceTypeList, createInsuranceRegister };

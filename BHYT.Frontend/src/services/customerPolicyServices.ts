import { deleteMethod, getMethod, postMethod } from "../helpers/api";

const getCustomerPolicy = async (id: string) => {
  const response = await getMethod("/CustomerPolicy/" + id);
  return response;
};

const rejectCustomerPolicy = async (policyId: number) => {
  const response = await deleteMethod("/CustomerPolicy/reject?policyId=" + policyId);
  return response;
};

interface issueCustomerPolicyBody {
  paymentOption: boolean | undefined; // loại thanh toán true: Tháng, false : năm
  insuranceId: number | undefined;
  description: string | null;
  status: boolean | undefined;
  sex: string | undefined;
  birthday: string | undefined;
}
const issueCustomerPolicy = async (body: issueCustomerPolicyBody) => {
  return await postMethod("/CustomerPolicy/Issue", body);
};

// /CustomerPolicy/list-policy?id=2
const getListCustomerPolicy = async (customerId: number) => {
  const response = await getMethod("/CustomerPolicy/list-policy?id=" + customerId);
  return response;
};

// interface CustomerPolicy{
//   id: number|null,
//   customerId:string |undefined,
//   guid: string|null,
//   startDate: string|null,
//   createdDate: string|null,
//   endDate: string|null,
//   premiumAmount: number|null,
//   paymentOption: boolean|null,
//   coverageType: string|null,
//   deductibleAmount: number|null,
//   benefitId: string|null,
//   insuranceId: number|null,
//   latestUpdate:string|null,
//   description: string|null,
//   status: boolean|null,
//   company: string|null
// }

//public int Id { get; set; }

// public Guid? Guid { get; set; }

// public int CustomerId { get; set; }

// public DateTime? StartDate { get; set; }

// public DateTime? CreatedDate { get; set; }

// public DateTime? EndDate { get; set; }

// public double? PremiumAmount { get; set; }

// public bool? PaymentOption { get; set; }

// public string? CoverageType { get; set; }

// public double? DeductibleAmount { get; set; }

// public int? BenefitId { get; set; }

// public int? InsuranceId { get; set; }

// public DateTime? LatestUpdate { get; set; }

// public string? Description { get; set; }

// public bool? Status { get; set; } // true: duyệt r , false: chưa duyệt , null: loại bỏ

// public string? Company { get; set; }

const createCustomerPolicy = async (body: any) => {
  console.log(body);
  const response = await postMethod("/CustomerPolicy/add-new", body);
  return response;
};
export { getCustomerPolicy, rejectCustomerPolicy, issueCustomerPolicy, getListCustomerPolicy, createCustomerPolicy };

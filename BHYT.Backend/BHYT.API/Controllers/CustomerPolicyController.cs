using AutoMapper;
using AutoMapper.QueryableExtensions;
using BHYT.API.Models.DbModels;
using BHYT.API.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BHYT.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerPolicyController : ControllerBase
    {
        private readonly BHYTDbContext _context;
        private readonly IMapper _mapper;

        public CustomerPolicyController(BHYTDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public IActionResult GetCustomerPolicy(int id)
        {
            try
            {
                var customerPolicy = _context.CustomerPolicies
                 .Where(policy => policy.Id == id)
                 .ProjectTo<CustomerPolicyDTO>(_mapper.ConfigurationProvider)
                 .FirstOrDefault();

                if (customerPolicy != null)
                {
                    return Ok(new
                    {
                        customerPolicy
                    });
                }
                return NotFound(new ApiResponse { Message = "Không tìm thấy chính sách" });
            }
            catch (Exception)
            {
                return Conflict(new ApiResponseDTO
                {
                    Message = "Lỗi xảy ra khi lấy chính sách"
                });
            }
        }

        [HttpDelete("reject")]
        public async Task<ActionResult> RejectInsurancePolicy(int policyId)
        {
            CustomerPolicy customerPolicy;
            try
            {
                customerPolicy = _context.CustomerPolicies.Where(x => x.Id == policyId).FirstOrDefault();
                if (customerPolicy == null)
                {
                    return Conflict(new ApiResponseDTO
                    {
                        Message = "Chính sách không tồn tại trong hệ thống !"
                    });

                }
                //_context.CustomerPolicies.Remove(customerPolicy);
                customerPolicy.Status = null;
                await _context.SaveChangesAsync();

                return Ok(new ApiResponseDTO
                {
                    Message = "Xoá chính sách thành công !"
                });
            }
            catch
            {
                return Conflict(new ApiResponseDTO
                {
                    Message = "Lỗi xoá thông tin chính sách!"
                });
            }
            finally
            {
                customerPolicy = null;
            }
        }

        [HttpPost("Issue")]
        public async Task<ActionResult> IssuePolicy([FromBody] InsurancePolicyIssueDTO policyIssue)
        {
            CustomerPolicy customerPolicy;
            try
            {
                customerPolicy = _context.CustomerPolicies.Where(x => x.Id == policyIssue.policyId).FirstOrDefault();
                if (customerPolicy == null)
                {
                    return Conflict(new ApiResponseDTO
                    {
                        Message = "Chính sách chưa tồn tại trong hệ thống, người dùng chưa đăng kí chính sách bảo hiểm !"
                    });

                }
                _mapper.Map(policyIssue, customerPolicy); // Ánh xạ từ DTO sang model

                customerPolicy.Status = true;
                // customerPolicy.PremiumAmount = tính toán ()
                // customerPolicy.DeductibleAmount = tính toán ()
                //insert thông tin phê duyệt

                var policyApproval = new PolicyApproval();
                policyApproval.PolicyId = policyIssue.policyId;
                policyApproval.ApprovalDate = DateTime.Now;
                policyApproval.StatusId = 1;
                policyApproval.Guid = new Guid();
                policyApproval.EmployeeId = (from user in _context.Users
                                             join account in _context.Accounts on user.AccountId equals account.Id
                                             where account.Username == User.FindFirstValue(ClaimTypes.Name)
                                             select user.Id).FirstOrDefault();
                _context.PolicyApprovals.Add(policyApproval);

                await _context.SaveChangesAsync();


                return Ok(new ApiResponseDTO
                {
                    Message = "Phát hành chính sách thành công !"
                });
            }
            catch
            {
                return Conflict(new ApiResponseDTO
                {
                    Message = "Lỗi phát hành chính sách bảo hiểm !"
                });
            }
            finally
            {
                customerPolicy = null;
            }
        }

        [HttpGet("list-policy")]
        public async Task<ActionResult<IEnumerable<CustomerPolicyDTO>>> GetAllPolicyOfUserById(int id)
        {
            try
            {

                var policies = await _context.CustomerPolicies
                              .Where(x => x.CustomerId == id)
                              .OrderBy(x => x.Id)
                              .ToListAsync();
                return Ok(_mapper.Map<List<CustomerPolicyDTO>>(policies));

            }
            catch (Exception ex)
            {
                return NotFound(new ApiResponseDTO
                {
                    Message = " lỗi lấy danh sách chính sách bảo hiểm của khách hàng ",
                });
            }
        }

        [HttpPost("add-new")]
        public async Task<IActionResult> AddNewCustomerPolicy([FromBody] AddNewPolicyDTO dto)
        {
            try
            {
                CustomerPolicy newPolicy = new CustomerPolicy();
                newPolicy = _mapper.Map<CustomerPolicy>(dto);
                Insurance temp = await _context.Insurances.FirstOrDefaultAsync(x => x.Id == newPolicy.InsuranceId);


                newPolicy.Guid = Guid.NewGuid();
                //newPolicy.StartDate = DateTime.Parse(dto.StartDate);
                newPolicy.CreatedDate = DateTime.Now;
                newPolicy.Status = false;
                newPolicy.Company = "VINA LIFE";
                newPolicy.LatestUpdate = DateTime.Now;
                newPolicy.EndDate = DateTime.Parse(dto.StartDate).AddYears(dto.Year);
                newPolicy.ImageName = "";
                newPolicy.PremiumAmount = temp.Price;
                newPolicy.CoverageType = temp.Name;
                _context.CustomerPolicies.Add(newPolicy);

                await _context.SaveChangesAsync();
                return Ok(new ApiResponseDTO
                {
                    Success = true,
                    Message ="Đăng kí chính sách thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponseDTO { Message = "lỗi phát hành chính sách !" });
            }
        }
    }
}
//public int Id { get; set; }
//public Guid? Guid { get; set; }
//public int? CustomerId { get; set; }
//public DateTime? StartDate { get; set; }
//public DateTime? CreatedDate { get; set; }
//public DateTime? EndDate { get; set; }
//public double? PremiumAmount { get; set; }
//public bool? PaymentOption { get; set; }  // loại thanh toán true: Tháng, false : năm
//public string? CoverageType { get; set; }
//public double? DeductibleAmount { get; set; }
//public int? BenefitId { get; set; }
//public int? InsuranceId { get; set; }
//public DateTime? LatestUpdate { get; set; }
//public string? Description { get; set; }
//public bool? Status { get; set; } // true: duyệt r , false: chưa duyệt , null: loại bỏ
//public string? Company { get; set; }




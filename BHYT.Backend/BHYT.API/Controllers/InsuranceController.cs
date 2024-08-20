using AutoMapper;
using AutoMapper.QueryableExtensions;
using BHYT.API.Models.DbModels;
using BHYT.API.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BHYT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceController : ControllerBase
    {
        private readonly BHYTDbContext _context;
        private readonly IMapper _mapper;

        public InsuranceController(BHYTDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllInsuranceByGroup()
        {
            try
            {
                var insurancePayments = _context.Insurances
                       .GroupBy(insurance => insurance.subInsuranceTypeName)
                       .ToList();

                return Ok(insurancePayments);

            }
            catch (Exception)
            {
                return Conflict(new ApiResponseDTO
                {
                    Message = "Lỗi xảy ra khi lấy insurance"
                });
            }
        }

        [HttpGet("{id}")    ]
        public async Task<ActionResult> GetInsuranceById(int id)
        {
            try
            {
                var insurancePayments = _context.Insurances
                       .Where(x => x.Id == id)
                       .Single();

                return Ok(insurancePayments);

            }
            catch (Exception)
            {
                return Conflict(new ApiResponseDTO
                {
                    Message = "Lỗi xảy ra khi lấy insurance"
                });
            }
        }
    }
}

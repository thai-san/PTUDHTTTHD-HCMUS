using AutoMapper;
using BHYT.API.Models.DbModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper.QueryableExtensions;
using BHYT.API.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace BHYT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceTypeController : ControllerBase
    {
        private readonly BHYTDbContext _context;
        private readonly IMapper _mapper;

        public InsuranceTypeController(BHYTDbContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InsuranceTypeDTO>>> GetInsuranceType()
        {
            try
            {
                var listInsuranceType = await _context.InsuranceTypes
               .OrderBy(x => x.Id).ToListAsync();
                return Ok(_mapper.Map<List<InsuranceTypeDTO>>(listInsuranceType));
            }
            catch (Exception ex)
            {
                return NotFound(new ApiResponseDTO
                {
                    Message = " lỗi lấy danh sách loại bảo hiểm",
                });
            }
        }
    }
}

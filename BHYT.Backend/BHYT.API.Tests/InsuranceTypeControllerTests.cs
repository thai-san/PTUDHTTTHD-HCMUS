using AutoMapper;
using BHYT.API.Controllers;
using BHYT.API.Models.DbModels;
using BHYT.API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BHYT.API.Tests
{
    public class InsuranceTypeControllerTests
    {
        private readonly InsuranceTypeController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;
        private readonly Mock<IMapper> _mockMapper;

        public InsuranceTypeControllerTests()
        {

            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _mockMapper = new Mock<IMapper>();
            _mockMapper.Setup(m => m.ConfigurationProvider).Returns(() => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<InsuranceType, InsuranceTypeDTO>();
            }));
            _controller = new InsuranceTypeController(_mockContext.Object, _mockMapper.Object);

        }

        [Fact]
        public async Task GetInsuranceType_ReturnsInsuranceTypes()
        {
            // Arrange
            var insuranceTypes = new List<InsuranceType>
    {
        new InsuranceType { Id = 1, Name = "Type1" },
        new InsuranceType { Id = 2, Name = "Type2" }
    };

            _mockContext.Setup(db => db.InsuranceTypes).ReturnsDbSet(insuranceTypes);

                        var insuranceTypeDTOs = new List<InsuranceTypeDTO>
                {
                    new InsuranceTypeDTO { Id = 1, Name = "Type1" },
                    new InsuranceTypeDTO { Id = 2, Name = "Type2" }
                };

            _mockMapper.Setup(m => m.Map<List<InsuranceTypeDTO>>(It.IsAny<List<InsuranceType>>())).Returns(insuranceTypeDTOs);

            // Act
            var result = await _controller.GetInsuranceType();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<InsuranceTypeDTO>>(okResult.Value);
            Assert.Equal(insuranceTypeDTOs.Count, returnValue.Count);
        }

        [Fact]
        public async Task GetInsuranceType_ThrowsException_ReturnsNotFound()
        {
            // Arrange
            _mockContext.Setup(db => db.InsuranceTypes).Throws(new Exception());

            // Act
            var result = await _controller.GetInsuranceType();

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            var returnValue = Assert.IsType<ApiResponseDTO>(notFoundResult.Value);
            Assert.Equal(" lỗi lấy danh sách loại bảo hiểm", returnValue.Message);
        }


    }
}

using AutoMapper;
using BHYT.API.Controllers;
using BHYT.API.Models.DbModels;
using BHYT.API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;


namespace BHYT.API.Tests
{
    public class CompensationControllerTests
    {
        private readonly CompensationController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;
        private readonly Mock<IMapper> _mockMapper;

        public CompensationControllerTests()
        {

            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _mockMapper = new Mock<IMapper>();

            _controller = new CompensationController(_mockContext.Object, _mockMapper.Object);

        }

        [Fact]
        public async Task GetCompensationRequestByCustomerID_ReturnsExpectedResult_WhenCalledWithValidCustomerId()
        {
            // Arrange
            var customerId = 1;

            // Set up your mocks here...
            // For example:
            var mockCompensation = new Compensation { PolicyId = 1 };
            _mockContext.Setup(c => c.Compensations).ReturnsDbSet(new List<Compensation> { mockCompensation });

            var mockCustomerPolicy = new CustomerPolicy { Id = 1, CustomerId = customerId };
            _mockContext.Setup(c => c.CustomerPolicies).ReturnsDbSet(new List<CustomerPolicy> { mockCustomerPolicy });

            var mockUser = new User { Id = customerId };
            _mockContext.Setup(c => c.Users).ReturnsDbSet(new List<User> { mockUser });

            // Act
            var result = await _controller.GetCompensationRequestByCustomerID(customerId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<CompensationDTO>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var compensations = Assert.IsAssignableFrom<IEnumerable<CompensationDTO>>(okResult.Value);
            Assert.Single(compensations);
        }

        [Fact]
        public async Task GetCompensationRequestByCustomerID_ReturnsConflictResult_WhenExceptionIsThrown()
        {
            // Arrange
            var customerId = 1;
            _mockContext.Setup(c => c.Compensations).Throws<Exception>();

            // Act
            var result = await _controller.GetCompensationRequestByCustomerID(customerId);

            // Assert
            Assert.IsType<ConflictObjectResult>(result.Result);
        }

        [Fact]
        public async Task AddNewCompensationRequest_ReturnsBadRequest_WhenExceptionIsThrown()
        {
            // Arrange
            var compensationDto = new CompensationDTO { /* Set properties here */ };

            // Set up your mocks here...
            // For example:
            var mockCompensation = new Compensation();
            _mockContext.Setup(c => c.Compensations.Add(It.IsAny<Compensation>())).Throws<Exception>();


            // Act
            var result = await _controller.AddNewCompensationRequest(compensationDto);

            // Assert
            var okResult = Assert.IsType<BadRequestObjectResult>(result);
            var response = Assert.IsType<ApiResponseDTO>(okResult.Value);
            Assert.False(response.Success);
            Assert.Equal("lỗi gửi yêu cầu bồi thưởng!", response.Message);
        }


        [Fact]
        public async Task AddNewCompensationRequest_ReturnsOkResult_WhenCalledWithValidDto()
        {
            // Arrange
            var compensationDto = new CompensationDTO { /* Set properties here */ };

            // Set up your mocks here...
            // For example:
            var mockCompensation = new Compensation();
            _mockContext.Setup(c => c.Compensations.Add(It.IsAny<Compensation>()));

            var mockMapper = new Mock<IMapper>();
            mockMapper.Setup(m => m.Map<Compensation>(It.IsAny<CompensationDTO>())).Returns(mockCompensation);

            // Act
            var result = await _controller.AddNewCompensationRequest(compensationDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<ApiResponseDTO>(okResult.Value);
            Assert.True(response.Success);
            Assert.Equal("Yêu cầu thanh toán thành công!", response.Message);
        }


        [Fact]
        public async Task UpdateStatus_ReturnsOkResult_WhenCalledWithValidDto()
        {
            // Arrange
            var dto = new UpdateCompensationStatusDTO { /* Set properties here */ };

            // Set up your mocks here...
            // For example:
            var mockCompensation = new Compensation { Id = dto.compensationId };
            _mockContext.Setup(c => c.Compensations).ReturnsDbSet(new List<Compensation> { mockCompensation });

            // Act
            var result = await _controller.updateStatus(dto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<ApiResponseDTO>(okResult.Value);
            Assert.Equal("Cập nhật thành công !", response.Message);
        }

        [Fact]
        public async Task UpdateStatus_ReturnsNotFoundResult_WhenCompensationDoesNotExist()
        {
            // Arrange
            var dto = new UpdateCompensationStatusDTO { /* Set properties here */ };

            // Set up your mocks here...
            // For example:
            _mockContext.Setup(c => c.Compensations).ReturnsDbSet(new List<Compensation>());

            // Act
            var result = await _controller.updateStatus(dto);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            var response = Assert.IsType<ApiResponseDTO>(notFoundResult.Value);
            Assert.Equal(" không tìm thấy yêu cầu bồi thường để cập nhật !", response.Message);
        }

        [Fact]
        public async Task UpdateStatus_ReturnsNotFoundResult_WhenExceptionIsThrown()
        {
            // Arrange
            var dto = new UpdateCompensationStatusDTO { /* Set properties here */ };

            // Set up your mocks here...
            // For example:
            _mockContext.Setup(c => c.Compensations).Throws<Exception>();

            // Act
            var result = await _controller.updateStatus(dto);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            var response = Assert.IsType<ApiResponseDTO>(notFoundResult.Value);
            Assert.Equal(" lỗi cập nhật trạng thái bồi thường !", response.Message);
        }




    }
}

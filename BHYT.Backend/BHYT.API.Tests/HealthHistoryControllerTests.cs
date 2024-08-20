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
    public class HealthHistoryControllerTests
    {
        private readonly HealthHistoryController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;
        private readonly Mock<IMapper> _mockMapper;

        public HealthHistoryControllerTests()
        {

            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _mockMapper = new Mock<IMapper>();

            _controller = new HealthHistoryController(_mockContext.Object, _mockMapper.Object);

        }


        [Fact]
        public async Task GetCustomerHealthHistory_ReturnsOkResult_WhenCalledWithValidId()
        {
            // Arrange
            var id = 1;

            // Set up your mocks here...
            // For example:
            var mockHealthHistory = new HealthHistory { CustomerId = id };
            _mockContext.Setup(c => c.HealthHistories).ReturnsDbSet(new List<HealthHistory> { mockHealthHistory });

            // Act
            var actionResult = await _controller.GetCustomerHealthHistory(id);

            // Assert
            Assert.IsType<OkObjectResult>(actionResult.Result);
        }

        [Fact]
        public async Task GetCustomerHealthHistory_ReturnsConflictResult_WhenExceptionIsThrown()
        {
            // Arrange
            var id = 1;

            // Set up your mocks here...
            // For example:
            _mockContext.Setup(c => c.HealthHistories).Throws<Exception>();

            // Act
            var actionResult = await _controller.GetCustomerHealthHistory(id);

            // Assert
            Assert.IsType<ConflictObjectResult>(actionResult.Result);
        }


    }
}

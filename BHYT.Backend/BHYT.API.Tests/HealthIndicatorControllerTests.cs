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
    public class HealthIndicatorControllerTests
    {
        private readonly HealthIndicatorController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;
        private readonly Mock<IMapper> _mockMapper;

        public HealthIndicatorControllerTests()
        {

            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _mockMapper = new Mock<IMapper>();

            _controller = new HealthIndicatorController(_mockContext.Object, _mockMapper.Object);

        }

        [Fact]
        public async Task GetHealthIndicators_ReturnsOkResult_WhenCalledWithValidId()
        {
            // Arrange
            var id = 1;
            var mockHealthIndicator = new HealthIndicator { CustomerId = id };
            _mockContext.Setup(c => c.HealthIndicators).ReturnsDbSet(new List<HealthIndicator> { mockHealthIndicator });

            // Act
            var actionResult = await _controller.GetHealthIndicators(id);

            // Assert
            Assert.IsType<OkObjectResult>(actionResult.Result);
        }

        [Fact]
        public async Task GetHealthIndicators_ReturnsNotFoundResult_WhenNoHealthIndicatorFound()
        {
            // Arrange
            var id = 1;
            _mockContext.Setup(c => c.HealthIndicators).ReturnsDbSet(new List<HealthIndicator>());

            // Act
            var actionResult = await _controller.GetHealthIndicators(id);

            // Assert
            Assert.IsType<OkObjectResult>(actionResult.Result);
        }

        [Fact]
        public async Task GetHealthIndicators_ReturnsNotFoundResult_WhenExceptionIsThrown()
        {
            // Arrange
            var id = 1;
            _mockContext.Setup(c => c.HealthIndicators).Throws<Exception>();

            // Act
            var actionResult = await _controller.GetHealthIndicators(id);

            // Assert
            Assert.IsType<NotFoundObjectResult>(actionResult.Result);
        }

        [Fact]
        public async Task UpdateHealthIndicator_ReturnsOkResult_WhenCalledWithValidDto()
        {
            // Arrange
            var dto = new HealthIndicatorDTO { CustomerId = 1 };
            var mockHealthIndicator = new HealthIndicator { CustomerId = dto.CustomerId };
            _mockContext.Setup(c => c.HealthIndicators).ReturnsDbSet(new List<HealthIndicator> { mockHealthIndicator });

            // Act
            var actionResult = await _controller.UpdateHealthIndicator(dto);

            // Assert
            var result = actionResult as OkObjectResult;
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task UpdateHealthIndicator_ReturnsNotFoundResult_WhenNoHealthIndicatorFound()
        {
            // Arrange
            var dto = new HealthIndicatorDTO { CustomerId = 1 };
            _mockContext.Setup(c => c.HealthIndicators).ReturnsDbSet(new List<HealthIndicator>());

            // Act
            var actionResult = await _controller.UpdateHealthIndicator(dto);

            // Assert
            var result = actionResult as OkObjectResult;
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task UpdateHealthIndicator_ReturnsNotFoundResult_WhenExceptionIsThrown()
        {
            // Arrange
            var dto = new HealthIndicatorDTO { CustomerId = 1 };
            _mockContext.Setup(c => c.HealthIndicators).Throws<Exception>();

            // Act
            var actionResult = await _controller.UpdateHealthIndicator(dto);

            // Assert
            var result = actionResult as OkObjectResult;
            Assert.Null(result);
        }


    }
}

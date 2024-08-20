using BHYT.API.Controllers;
using BHYT.API.Models.DbModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Moq.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BHYT.API.Tests
{
    public class InsuranceApprovalControllerTests
    {
        private readonly InsuranceApprovalController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;

        public InsuranceApprovalControllerTests()
        {
            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _controller = new InsuranceApprovalController(_mockContext.Object);
        }

        [Fact]
        public async Task ApprovedPolicyDetail_ReturnsOkResult_WhenCalled()
        {
            // Arrange
            var mockCustomerPolicy = new CustomerPolicy { Status = true };
            var mockUser = new User { Id = 1 };
            var mockInsurance = new Insurance { Id = 1 };
            var mockPolicyApproval = new PolicyApproval { PolicyId = 1 };

            _mockContext.Setup(c => c.CustomerPolicies).ReturnsDbSet(new List<CustomerPolicy> { mockCustomerPolicy });
            _mockContext.Setup(c => c.Users).ReturnsDbSet(new List<User> { mockUser });
            _mockContext.Setup(c => c.Insurances).ReturnsDbSet(new List<Insurance> { mockInsurance });
            _mockContext.Setup(c => c.PolicyApprovals).ReturnsDbSet(new List<PolicyApproval> { mockPolicyApproval });

            // Act
            var actionResult = await _controller.ApprovedPolicyDetail();

            // Assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task ApprovedPolicyDetail_ReturnsConflictResult_WhenExceptionIsThrown()
        {
            // Arrange
            _mockContext.Setup(c => c.CustomerPolicies).Throws<Exception>();

            // Act
            var actionResult = await _controller.ApprovedPolicyDetail();

            // Assert
            var result = actionResult.Result as ConflictObjectResult;
            Assert.NotNull(result);
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public async Task GetAllInsuranceApproval_ReturnsOkResult_WhenCalled()
        {
            // Arrange
            var mockCustomerPolicy = new CustomerPolicy { Status = false };
            var mockUser = new User { Id = 1 };
            var mockInsurance = new Insurance { Id = 1 };

            _mockContext.Setup(c => c.CustomerPolicies).ReturnsDbSet(new List<CustomerPolicy> { mockCustomerPolicy });
            _mockContext.Setup(c => c.Users).ReturnsDbSet(new List<User> { mockUser });
            _mockContext.Setup(c => c.Insurances).ReturnsDbSet(new List<Insurance> { mockInsurance });

            // Act
            var actionResult = await _controller.GetAllInsuranceApproval();

            // Assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetAllInsuranceApproval_ReturnsConflictResult_WhenExceptionIsThrown()
        {
            // Arrange
            _mockContext.Setup(c => c.CustomerPolicies).Throws<Exception>();

            // Act
            var actionResult = await _controller.GetAllInsuranceApproval();

            // Assert
            var result = actionResult.Result as ConflictObjectResult;
            Assert.NotNull(result);
            Assert.IsType<ConflictObjectResult>(result);
        }

    }
}

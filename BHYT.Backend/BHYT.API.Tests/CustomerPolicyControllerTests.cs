using AutoMapper;
using BHYT.API.Controllers;
using BHYT.API.Models.DbModels;
using BHYT.API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Newtonsoft.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Data.Entity.Infrastructure;
using System.Reflection.Metadata;
using Moq.EntityFrameworkCore;

namespace BHYT.API.Tests
{
    public class CustomerPolicyControllerTests
    {
        private readonly CustomerPolicyController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;
        private readonly Mock<IMapper> _mockMapper;

        public CustomerPolicyControllerTests()
        {

            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _mockMapper = new Mock<IMapper>();
            _mockMapper.Setup(m => m.ConfigurationProvider).Returns(() => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CustomerPolicy, CustomerPolicyDTO>();
            }));

            _controller = new CustomerPolicyController(_mockContext.Object, _mockMapper.Object);

        }

        [Fact]
        public void GetCustomerPolicy_ReturnsNotFound_WhenNoPolicyExists()
        {
            // Arrange
            var testId = 1;

            // Create a list of customer policies
            var customerPolicies = new List<CustomerPolicy>();

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<CustomerPolicy>>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Returns(customerPolicies.AsQueryable().Provider);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Expression).Returns(customerPolicies.AsQueryable().Expression);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.ElementType).Returns(customerPolicies.AsQueryable().ElementType);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.GetEnumerator()).Returns(customerPolicies.GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSet.Object);

            // Create the controller with the mock context and mapper
            var _controller = new CustomerPolicyController(_mockContext.Object, _mockMapper.Object);

            // Act
            var result = _controller.GetCustomerPolicy(testId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetCustomerPolicy_ReturnsData_WhenPolicyExists()
        {
            // Arrange
            var testId = 1;
            var customerPolicy = new CustomerPolicy { Id = testId };

            // Create a list of customer policies
            var customerPolicies = new List<CustomerPolicy> { customerPolicy };

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<CustomerPolicy>>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Returns(customerPolicies.AsQueryable().Provider);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Expression).Returns(customerPolicies.AsQueryable().Expression);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.ElementType).Returns(customerPolicies.AsQueryable().ElementType);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.GetEnumerator()).Returns(customerPolicies.GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSet.Object);

            // Create the controller with the mock context and mapper
            var _controller = new CustomerPolicyController(_mockContext.Object, _mockMapper.Object);

            // Act
            var result = _controller.GetCustomerPolicy(testId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var expectedJson = "{\"customerPolicy\":{\"Id\":1,\"Guid\":null,\"StartDate\":null,\"CreatedDate\":null,\"EndDate\":null,\"PremiumAmount\":null,\"PaymentOption\":null,\"CoverageType\":null,\"DeductibleAmount\":null,\"BenefitId\":null,\"InsuranceId\":null,\"LatestUpdate\":null,\"Description\":null,\"Status\":null,\"Company\":null}}";
            var actualJson = JsonConvert.SerializeObject(okResult.Value);
            Assert.Equal(expectedJson, actualJson);
        }

        [Fact]
        public void GetCustomerPolicy_ReturnsConflict_WhenExceptionOccurs()
        {
            // Arrange
            var testId = 1;

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<CustomerPolicy>>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Throws<Exception>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Expression).Throws<Exception>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.ElementType).Throws<Exception>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.GetEnumerator()).Throws<Exception>();

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSet.Object);

            // Create the controller with the mock context and mapper
            var _controller = new CustomerPolicyController(_mockContext.Object, _mockMapper.Object);

            // Act
            var result = _controller.GetCustomerPolicy(testId);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public async Task RejectInsurancePolicy_ReturnsConflict_WhenPolicyDoesNotExist()
        {
            // Arrange
            var policyId = 1;

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<CustomerPolicy>>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Returns(Enumerable.Empty<CustomerPolicy>().AsQueryable().Provider);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Expression).Returns(Enumerable.Empty<CustomerPolicy>().AsQueryable().Expression);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.ElementType).Returns(Enumerable.Empty<CustomerPolicy>().AsQueryable().ElementType);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.GetEnumerator()).Returns(Enumerable.Empty<CustomerPolicy>().GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSet.Object);

            // Act
            var result = await _controller.RejectInsurancePolicy(policyId);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public async Task RejectInsurancePolicy_ReturnsOk_WhenPolicyExists()
        {
            // Arrange
            var policyId = 1;
            var customerPolicy = new CustomerPolicy { Id = policyId };

            // Create a list of customer policies
            var customerPolicies = new List<CustomerPolicy> { customerPolicy };

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<CustomerPolicy>>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Returns(customerPolicies.AsQueryable().Provider);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Expression).Returns(customerPolicies.AsQueryable().Expression);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.ElementType).Returns(customerPolicies.AsQueryable().ElementType);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.GetEnumerator()).Returns(customerPolicies.GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSet.Object);
            _mockContext.Setup(c => c.SaveChangesAsync(default)).Returns(Task.FromResult(0));

            // Act
            var result = await _controller.RejectInsurancePolicy(policyId);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task RejectInsurancePolicy_ReturnsConflict_WhenExceptionOccurs()
        {
            // Arrange
            var policyId = 1;

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<CustomerPolicy>>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Throws<Exception>();

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSet.Object);

            // Act
            var result = await _controller.RejectInsurancePolicy(policyId);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public async Task IssuePolicy_ReturnsConflict_WhenPolicyDoesNotExist()
        {
            // Arrange
            var policyIssue = new InsurancePolicyIssueDTO { policyId = 1 };

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<CustomerPolicy>>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Returns(Enumerable.Empty<CustomerPolicy>().AsQueryable().Provider);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Expression).Returns(Enumerable.Empty<CustomerPolicy>().AsQueryable().Expression);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.ElementType).Returns(Enumerable.Empty<CustomerPolicy>().AsQueryable().ElementType);
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.GetEnumerator()).Returns(Enumerable.Empty<CustomerPolicy>().GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSet.Object);

            // Act
            var result = await _controller.IssuePolicy(policyIssue);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public async Task IssuePolicy_ReturnsOk_WhenPolicyExists()
        {
            // Arrange
            var policyId = 1;
            var policyIssue = new InsurancePolicyIssueDTO { policyId = policyId };
            var customerPolicy = new CustomerPolicy { Id = policyId };

            // Create a list of customer policies
            var customerPolicies = new List<CustomerPolicy> { customerPolicy };

            // Create a mock DbSet for CustomerPolicies
            var mockSetCustomerPolicies = new Mock<DbSet<CustomerPolicy>>();
            mockSetCustomerPolicies.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Returns(customerPolicies.AsQueryable().Provider);
            mockSetCustomerPolicies.As<IQueryable<CustomerPolicy>>().Setup(m => m.Expression).Returns(customerPolicies.AsQueryable().Expression);
            mockSetCustomerPolicies.As<IQueryable<CustomerPolicy>>().Setup(m => m.ElementType).Returns(customerPolicies.AsQueryable().ElementType);
            mockSetCustomerPolicies.As<IQueryable<CustomerPolicy>>().Setup(m => m.GetEnumerator()).Returns(customerPolicies.GetEnumerator());

            // Create a list of users
            var users = new List<User> { /* initialize users here */ };

            // Create a mock DbSet for Users
            var mockSetUsers = new Mock<DbSet<User>>();
            mockSetUsers.As<IQueryable<User>>().Setup(m => m.Provider).Returns(users.AsQueryable().Provider);
            mockSetUsers.As<IQueryable<User>>().Setup(m => m.Expression).Returns(users.AsQueryable().Expression);
            mockSetUsers.As<IQueryable<User>>().Setup(m => m.ElementType).Returns(users.AsQueryable().ElementType);
            mockSetUsers.As<IQueryable<User>>().Setup(m => m.GetEnumerator()).Returns(users.GetEnumerator());

            // Create a list of accounts
            var accounts = new List<Account> { /* initialize accounts here */ };

            // Create a mock DbSet for Accounts
            var mockSetAccounts = new Mock<DbSet<Account>>();
            mockSetAccounts.As<IQueryable<Account>>().Setup(m => m.Provider).Returns(accounts.AsQueryable().Provider);
            mockSetAccounts.As<IQueryable<Account>>().Setup(m => m.Expression).Returns(accounts.AsQueryable().Expression);
            mockSetAccounts.As<IQueryable<Account>>().Setup(m => m.ElementType).Returns(accounts.AsQueryable().ElementType);
            mockSetAccounts.As<IQueryable<Account>>().Setup(m => m.GetEnumerator()).Returns(accounts.GetEnumerator());

            // Setup the mock context to return the mock DbSets
            _mockContext.Setup(c => c.Users).Returns(mockSetUsers.Object);
            _mockContext.Setup(c => c.Accounts).Returns(mockSetAccounts.Object);

            // Create a mock DbSet for PolicyApprovals
            var mockSetPolicyApprovals = new Mock<DbSet<PolicyApproval>>();
            mockSetPolicyApprovals.Setup(m => m.Add(It.IsAny<PolicyApproval>()));

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSetCustomerPolicies.Object);
            _mockContext.Setup(c => c.PolicyApprovals).Returns(mockSetPolicyApprovals.Object);
            _mockContext.Setup(c => c.SaveChangesAsync(default)).Returns(Task.FromResult(0));

            // Act
            var result = await _controller.IssuePolicy(policyIssue);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }



        [Fact]
        public async Task IssuePolicy_ReturnsConflict_WhenExceptionOccurs()
        {
            // Arrange
            var policyIssue = new InsurancePolicyIssueDTO { policyId = 1 };

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<CustomerPolicy>>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Throws<Exception>();

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSet.Object);

            // Act
            var result = await _controller.IssuePolicy(policyIssue);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public async Task GetAllPolicyOfUserById_ReturnsOk_WhenPoliciesExist()
        {
            // Arrange
            var customerId = 1;
            var customerPolicy = new CustomerPolicy { CustomerId = customerId };

            var customerPolicies = new List<CustomerPolicy> { customerPolicy };

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).ReturnsDbSet(customerPolicies);

            // Mock the mapper
            _mockMapper.Setup(m => m.Map<List<CustomerPolicyDTO>>(It.IsAny<List<CustomerPolicy>>())).Returns(new List<CustomerPolicyDTO>());

            // Act
            var result = await _controller.GetAllPolicyOfUserById(customerId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<CustomerPolicyDTO>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.IsType<List<CustomerPolicyDTO>>(okResult.Value);
        }

        [Fact]
        public async Task GetAllPolicyOfUserById_ReturnsNotFound_WhenExceptionOccurs()
        {
            // Arrange
            var customerId = 1;

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<CustomerPolicy>>();
            mockSet.As<IQueryable<CustomerPolicy>>().Setup(m => m.Provider).Throws<Exception>();

            // Create a mock context
            _mockContext.Setup(c => c.CustomerPolicies).Returns(mockSet.Object);

            // Act
            var result = await _controller.GetAllPolicyOfUserById(customerId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<CustomerPolicyDTO>>>(result);
            Assert.IsType<NotFoundObjectResult>(actionResult.Result);
        }



    }
}

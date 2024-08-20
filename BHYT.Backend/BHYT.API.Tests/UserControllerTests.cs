using AutoMapper;
using BHYT.API.Controllers;
using BHYT.API.Models.DbModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq.EntityFrameworkCore;
using Moq;
using System.Collections;
using BHYT.API.Models.DTOs;
using System.Linq.Expressions;

namespace BHYT.API.Tests
{
    public class UserControllerTests
    {
        private readonly UserController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly Mock<IMapper> _mockMapper;


        public UserControllerTests()
        {
            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _mockConfiguration = new Mock<IConfiguration>();
            _mockMapper = new Mock<IMapper>();
            _controller = new UserController(_mockContext.Object, _mockConfiguration.Object, _mockMapper.Object);
        }

        [Fact]
        public async Task GetUsers_ReturnsEmptyList_WhenNoUsersExist()
        {
            var users = new List<User>();

            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            var result = await _controller.GetUsers();


            var objectResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Null(objectResult.Value);

        }

        [Fact]
        public async Task GetUsers_ReturnsNotFound_WhenExceptionIsThrown()
        {
            // Arrange
            var users = new List<User>();

            // Create a mock context
            _mockContext.Setup(c => c.Users).Throws(new Exception());

            // Act
            var result = await _controller.GetUsers();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<UserDTO>>>(result);
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult.Result);
            Assert.IsType<ApiResponseDTO>(notFoundResult.Value);
        }


        [Fact]
        public async Task GetUserRole_ReturnsOk_WhenUserExists()
        {
            // Arrange
            var username = "testUser";
            var roles = new List<Role>{
                new Role { Id = 1, Name = "admin" },
                // Add more roles as needed
            };
                    var accounts = new List<Account>{
                new Account { Id = 1, Username = "testUser", Password="password" },
                // Add more accounts as needed
            };
                    var users = new List<User>{
                new User { Id = 1, AccountId = 1, RoleId = 1 },
                // Add more users as needed
            };

            _mockContext.Setup(c => c.Roles).ReturnsDbSet(roles);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            // Act
            var result = await _controller.GetUserRole(username);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetUserRole_ReturnsNotFound_WhenUserRoleIsEmpty()
        {
            // Arrange
            var username = "testUser";
            var role = new Role { Id = 1, Name = null }; 
            var account = new Account { Id = 1, Username = username, Password="" };
            var user = new User { Id = 1, AccountId = account.Id, RoleId = role.Id };

            var roles = new List<Role> { role };
            var accounts = new List<Account> { account };
            var users = new List<User> { user };

            // Create a mock context
            _mockContext.Setup(c => c.Roles).ReturnsDbSet(roles);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            // Act
            var result = await _controller.GetUserRole(username);

            // Assert
            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.IsType<ApiResponse>(actionResult.Value);
        }



        [Fact]
        public async Task GetUserRole_ReturnsConflict_WhenExceptionIsThrown()
        {
            _mockContext.Setup(c => c.Accounts).Throws<Exception>();

            var username = "testUser";

            var result = await _controller.GetUserRole(username);

            Assert.IsType<ConflictObjectResult>(result);
        }


        [Fact]
        public async Task UpdateStatus_ReturnsOk_WhenUserExists()
        {
            // Arrange
            var dto = new UpdateUserStatusDTO { customerId = 1, newStatus = 2 };
            var user = new User { Id = dto.customerId };

            var users = new List<User> { user };

            // Create a mock context
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            // Act
            var result = await _controller.updateStatus(dto);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.IsType<ApiResponseDTO>(actionResult.Value);
        }

        [Fact]
        public async Task UpdateStatus_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var dto = new UpdateUserStatusDTO { customerId = 1, newStatus = 2 };

            var users = new List<User>();

            // Create a mock context
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            // Act
            var result = await _controller.updateStatus(dto);

            // Assert
            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.IsType<ApiResponseDTO>(actionResult.Value);
        }

        [Fact]
        public async Task UpdateStatus_ReturnsNotFound_WhenExceptionIsThrown()
        {
            // Arrange
            var dto = new UpdateUserStatusDTO { customerId = 1, newStatus = 2 };
            var user = new User { Id = dto.customerId };

            var users = new List<User> { user };

            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);
            _mockContext.Setup(c => c.SaveChanges()).Throws(new Exception()); // Throw an exception when SaveChanges is called

            // Act
            var result = await _controller.updateStatus(dto);

            // Assert
            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.IsType<ApiResponseDTO>(actionResult.Value);
        }

        [Fact]
        public async Task UpdateProfile_ReturnsOk_WhenUserExists()
        {
            // Arrange
            var dto = new ProfileInforDTO { Id = 1, /* other properties */ };
            var user = new User { Id = dto.Id };

            var users = new List<User> { user };

            // Create a mock context
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            // Act
            var result = await _controller.updateStatus(dto);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.IsType<ApiResponseDTO>(actionResult.Value);
        }

        [Fact]
        public async Task UpdateProfile_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var dto = new ProfileInforDTO { Id = 1, /* other properties */ };

            var users = new List<User>();

            // Create a mock context
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            // Act
            var result = await _controller.updateStatus(dto);

            // Assert
            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.IsType<ApiResponseDTO>(actionResult.Value);
        }

        [Fact]
        public async Task UpdateProfile_ReturnsNotFound_WhenExceptionIsThrown()
        {
            // Arrange
            var dto = new ProfileInforDTO { Id = 1, /* other properties */ };
            var user = new User { Id = dto.Id };

            var users = new List<User> { user };

            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);
            _mockContext.Setup(c => c.SaveChanges()).Throws(new Exception()); // Throw an exception when SaveChanges is called

            // Act
            var result = await _controller.updateStatus(dto);

            // Assert
            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.IsType<ApiResponseDTO>(actionResult.Value);
        }

        [Fact]
        public async Task GetProfile_ReturnsOk_WhenUserExists()
        {
            // Arrange
            var accountId = 1;
            var user = new User { AccountId = accountId };

            var users = new List<User> { user };

            // Create a mock context
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            // Act
            var result = await _controller.get(accountId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<ProfileInforDTO>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.Null(okResult.Value);
        }

        [Fact]
        public async Task GetProfile_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var accountId = 1;

            var users = new List<User>();

            // Create a mock context
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            // Act
            var result = await _controller.get(accountId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<ProfileInforDTO>>(result);
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult.Result);
            Assert.IsType<ApiResponseDTO>(notFoundResult.Value);
        }

        [Fact]
        public async Task GetProfile_ReturnsNotFound_WhenExceptionIsThrown()
        {
            // Arrange
            var accountId = 1;
            var user = new User { AccountId = accountId };

            var users = new List<User> { user };

            _mockContext.Setup(c => c.Users).Throws<Exception>();

            // Act
            var result = await _controller.get(accountId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<ProfileInforDTO>>(result);
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult.Result);
            Assert.IsType<ApiResponseDTO>(notFoundResult.Value);
        }

    }

}
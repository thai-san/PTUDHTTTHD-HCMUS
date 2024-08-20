using BHYT.API.Controllers;
using BHYT.API.Models.DbModels;
using BHYT.API.Models.DTOs;
using BHYT.API.Services;
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
    public class ResetPasswordControllerTests
    {
        private readonly ResetPasswordController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;
        private readonly Mock<IEmailService> _mockEmailService;

        public ResetPasswordControllerTests()
        {
            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _mockEmailService = new Mock<IEmailService>();

            _controller = new ResetPasswordController(_mockContext.Object, _mockEmailService.Object);
        }

        [Fact]
        public async Task RequestPasswordReset_ReturnsNotFound_WhenUserNotFound()
        {
            // Arrange
            var dto = new ResetPasswordRequestDTO { Email = "nonexistent@example.com" };

            var users = new List<User> { };
            var accounts = new List<Account> { };

            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);

            // Act
            var result = await _controller.RequestPasswordReset(dto);

            // Assert
            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.IsType<ApiResponse>(actionResult.Value);
        }
        [Fact]
        public async Task RequestPasswordReset_ReturnsOk_WhenUserFound()
        {
            // Arrange
            var dto = new ResetPasswordRequestDTO { Email = "user@example.com" };

            var user = new User { Id = 1, Email = dto.Email, AccountId = 1 };
            var account = new Account { Id = 1, Username = "user", Password = "user" };

            var users = new List<User> { user };
            var accounts = new List<Account> { account };
            var resetRequests = new List<ResetPasswordRequest> { };

            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);
            _mockContext.Setup(c => c.ResetPasswordRequests).ReturnsDbSet(resetRequests);

            _mockEmailService.Setup(s => s.SendEmailAsync(It.IsAny<EmailDTO>())).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.RequestPasswordReset(dto);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.IsType<ApiResponse>(actionResult.Value);

            _mockEmailService.Verify(s => s.SendEmailAsync(It.IsAny<EmailDTO>()), Times.Once);
        }

        [Fact]
        public async Task RequestPasswordReset_ReturnsInternalServerError_WhenExceptionIsThrown()
        {
            // Arrange
            var dto = new ResetPasswordRequestDTO { Email = "user@example.com" };

            var user = new User { Id = 1, Email = dto.Email, AccountId = 1 };
            var account = new Account { Id = 1, Username = "user", Password = "user" };

            var users = new List<User> { user };
            var accounts = new List<Account> { account };
            var resetRequests = new List<ResetPasswordRequest> { };

            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);
            _mockContext.Setup(c => c.ResetPasswordRequests).ReturnsDbSet(resetRequests);

            _mockEmailService.Setup(s => s.SendEmailAsync(It.IsAny<EmailDTO>())).Throws(new Exception("Email service failed.")); // Throw an exception when SendEmailAsync is called

            // Act
            var result = await _controller.RequestPasswordReset(dto);

            // Assert
            var actionResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, actionResult.StatusCode); // Check that the status code is 500
        }

        [Fact]
        public async Task ResetPassword_ReturnsBadRequest_WhenResetCodeIsInvalidOrExpired()
        {
            // Arrange
            var dto = new ResetPasswordDTO { UserId = "1", ResetCode = "InvalidCode", NewPassword = "NewPassword123!" };

            var resetRequests = new List<ResetPasswordRequest> { };

            _mockContext.Setup(c => c.ResetPasswordRequests).ReturnsDbSet(resetRequests);

            // Act
            var result = await _controller.ResetPassword(dto);

            // Assert
            var actionResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.IsType<ApiResponse>(actionResult.Value);
        }

        [Fact]
        public async Task ResetPassword_ReturnsNotFound_WhenUserNotFound()
        {
            // Arrange
            var dto = new ResetPasswordDTO { UserId = "1", ResetCode = "ValidCode", NewPassword = "NewPassword123!" };

            var resetRequest = new ResetPasswordRequest { UserId = dto.UserId, Resetrequestcode = dto.ResetCode, Requestdate = DateTime.UtcNow };
            var resetRequests = new List<ResetPasswordRequest> { resetRequest };

            var accounts = new List<Account> { };

            _mockContext.Setup(c => c.ResetPasswordRequests).ReturnsDbSet(resetRequests);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);

            // Act
            var result = await _controller.ResetPassword(dto);

            // Assert
            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.IsType<ApiResponse>(actionResult.Value);
        }

        [Fact]
        public async Task ResetPassword_ReturnsBadRequest_WhenNewPasswordIsInvalid()
        {
            // Arrange
            var dto = new ResetPasswordDTO { UserId = "1", ResetCode = "ValidCode", NewPassword = "inv" };

            var resetRequest = new ResetPasswordRequest { UserId = dto.UserId, Resetrequestcode = dto.ResetCode, Requestdate = DateTime.UtcNow };
            var resetRequests = new List<ResetPasswordRequest> { resetRequest };

            var account = new Account { Id = (int)Convert.ToUInt32(dto.UserId), Username="user", Password = "OldPassword123!" };
            var accounts = new List<Account> { account };

            _mockContext.Setup(c => c.ResetPasswordRequests).ReturnsDbSet(resetRequests);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);

            // Act
            var result = await _controller.ResetPassword(dto);

            // Assert
            var actionResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.IsType<ApiResponse>(actionResult.Value);
        }

        [Fact]
        public async Task ResetPassword_ReturnsOk_WhenPasswordResetSuccessfully()
        {
            // Arrange
            var dto = new ResetPasswordDTO { UserId = "1", ResetCode = "ValidCode", NewPassword = "NewPassword123!" };

            var resetRequest = new ResetPasswordRequest { UserId = dto.UserId, Resetrequestcode = dto.ResetCode, Requestdate = DateTime.UtcNow };
            var resetRequests = new List<ResetPasswordRequest> { resetRequest };

            var account = new Account { Id = (int)Convert.ToUInt32(dto.UserId),Username="username", Password = "OldPassword123!" };
            var accounts = new List<Account> { account };

            _mockContext.Setup(c => c.ResetPasswordRequests).ReturnsDbSet(resetRequests);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);

            // Act
            var result = await _controller.ResetPassword(dto);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.IsType<ApiResponse>(actionResult.Value);
        }

        [Fact]
        public async Task ResetPassword_ReturnsInternalServerError_WhenExceptionIsThrown()
        {
            // Arrange
            var dto = new ResetPasswordDTO { UserId = "1", ResetCode = "ValidCode", NewPassword = "NewPassword123!" };

            var resetRequest = new ResetPasswordRequest { UserId = dto.UserId, Resetrequestcode = dto.ResetCode, Requestdate = DateTime.UtcNow };
            var resetRequests = new List<ResetPasswordRequest> { resetRequest };

            var account = new Account { Id = (int)Convert.ToUInt32(dto.UserId),Username="123", Password = "OldPassword123!" };
            var accounts = new List<Account> { account };

            _mockContext.Setup(c => c.ResetPasswordRequests).Throws<Exception>();

         
            // Act
            var result = await _controller.ResetPassword(dto);

            // Assert
            var actionResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, actionResult.StatusCode); // Check that the status code is 500
        }


    }
}

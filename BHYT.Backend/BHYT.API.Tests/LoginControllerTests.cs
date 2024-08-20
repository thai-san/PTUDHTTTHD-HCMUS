using BHYT.API.Controllers;
using BHYT.API.Models.DbModels;
using BHYT.API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq.EntityFrameworkCore;
using Moq;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
using System.Linq.Expressions;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BHYT.API.Tests
{
    public class LoginControllerTests
    {
        private readonly LoginController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;
        private readonly Mock<IConfiguration> _mockConfiguration;

        public LoginControllerTests()
        {
            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _mockConfiguration = new Mock<IConfiguration>();
            _mockConfiguration.Setup(c => c["Jwt:Key"]).Returns("YourJwtKeyValue12345");
            _mockConfiguration.Setup(c => c["Jwt:TokenExpiryTimeInHour"]).Returns("1"); // replace with your value
            _mockConfiguration.Setup(c => c["Jwt:TokenExpiryTimeInSecond"]).Returns("3600"); // replace with your value
            _mockConfiguration.Setup(c => c["Jwt:Issuer"]).Returns("YourJwtIssuer"); // replace with your value
            _mockConfiguration.Setup(c => c["Jwt:Audience"]).Returns("YourJwtAudience"); // replace with your value
            _mockConfiguration.Setup(c => c["Jwt:Subject"]).Returns("YourSubjectValue");
            _controller = new LoginController(_mockContext.Object, _mockConfiguration.Object);
        }

        [Fact]
        public async Task Login_ReturnsBadRequest_WhenDtoIsNull()
        {
            // Act
            var result = await _controller.Login(null);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task Login_ReturnsBadRequest_WhenUsernameOrPasswordIsEmpty()
        {
            var testDto = new LoginDTO { Username = "", Password = "" };

            // Act
            var result = await _controller.Login(testDto);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task Login_ReturnsNotFound_WhenAccountDoesNotExist()
        {
            var accounts = new List<Account>();

            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);

            var testDto = new LoginDTO { Username = "nonExistingUser", Password = "password" };

            // Act
            var result = await _controller.Login(testDto);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task Login_ReturnsInternalServerError_WhenExceptionIsThrown()
        {
            _mockContext.Setup(c => c.Accounts).Throws<Exception>();

            var testDto = new LoginDTO { Username = "testUser", Password = "password" };

            // Act
            var result = await _controller.Login(testDto);

            // Assert
            Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, ((ObjectResult)result).StatusCode);
        }

        [Fact]
        public async Task Login_ReturnsOk_WhenCredentialsAreValid()
        {
            // Arrange
            var dto = new LoginDTO { Username = "testUser", Password = "password" };
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var account = new Account { Id = 1, Username = dto.Username, Password = hashedPassword };
            var user = new User { Id = 1, AccountId = account.Id, RoleId = 1 };
            var refreshToken = new RefreshToken();
           
            var role = new Role { Id = 1, Name = "admin" };
          
            var roles = new List<Role> { role };
            var accounts = new List<Account> { account };
            var users = new List<User> { user };

            var refreshTokens = new List<RefreshToken> { refreshToken };

            // Create a mock context
            _mockContext.Setup(c => c.Roles).ReturnsDbSet(roles);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);
            _mockContext.Setup(c => c.RefreshTokens).ReturnsDbSet(refreshTokens);

            // Mock the AddAsync method
            _mockContext.Setup(c => c.RefreshTokens.AddAsync(It.IsAny<RefreshToken>(), It.IsAny<CancellationToken>()))
             .Callback((RefreshToken refreshToken, CancellationToken cancellationToken) => refreshTokens.Add(refreshToken))
             .Returns((RefreshToken refreshToken, CancellationToken cancellationToken) => new ValueTask<EntityEntry<RefreshToken>>(Task.FromResult((EntityEntry<RefreshToken>)null)));

            // Act
            var result = await _controller.Login(dto);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            var json = JsonConvert.SerializeObject(actionResult.Value);
            var response = JsonConvert.DeserializeObject<dynamic>(json);
            Assert.Equal("Genarate token successfully", response.Message.ToString());
        }


        [Fact]
        public async Task Login_ReturnsBadRequest_WhenPasswordIsInvalid()
        {
            // Arrange
            var dto = new LoginDTO { Username = "testUser", Password = "wrongPassword" };
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword("password");
            var account = new Account { Id = 1, Username = dto.Username, Password = hashedPassword };
            var user = new User { Id = 1, AccountId = account.Id, RoleId = 1 };

            var accounts = new List<Account> { account };
            var users = new List<User> { user };

            // Create a mock context
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

            // Act
            var result = await _controller.Login(dto);

            // Assert
            var actionResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.IsType<ApiResponse>(actionResult.Value);
        }


        [Fact]
        public void GetClaims_ReturnsClaims_WhenUserExists()
        {
            // Arrange
            var user = new User { Id = 1, AccountId = 1, RoleId = 1 };
            var role = new Role { Id = 1, Name = "admin" };
            var account = new Account { Id = 1, Username = "testUser", Password="" };

            var roles = new List<Role> { role };
            var accounts = new List<Account> { account };
            var users = new List<User> { user };

            // Create a mock context
            _mockContext.Setup(c => c.Roles).ReturnsDbSet(roles);
            _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);
            _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

           // Act
           var claims = _controller.GetClaims(user);

            // Assert
            Assert.NotNull(claims);
            Assert.Equal(5, claims.Count());
            Assert.Contains(claims, claim => claim.Type == ClaimTypes.Role && claim.Value == role.Name);
            Assert.Contains(claims, claim => claim.Type == ClaimTypes.Name && claim.Value == account.Username);
        }

        [Fact]
        public void GenerateToken_ReturnsToken_WhenClaimsAreValid()
            {
                // Arrange
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, "testUser"),
            new Claim(ClaimTypes.Role, "admin")
        };

            // Act
            var (token, expire, tokenId) = _controller.GenerateToken(claims);

            // Assert
            Assert.IsType<string>(token);
            Assert.NotNull(token);
            Assert.Null(tokenId);
            Assert.True(expire > DateTime.UtcNow);
        }

        //[Fact]
        //public async Task RenewToken_ReturnsExpectedResult_WhenCalledWithValidDto()
        //{
        //    // Arrange
        //    var dto = new TokenDTO { AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRlc3RVc2VyIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzA1ODM4NDE5LCJleHAiOjE3MDU4Mzg0MjQsImlhdCI6MTcwNTgzODQxOSwiaXNzIjoiWW91ckp3dElzc3VlciIsImF1ZCI6IllvdXJKd3RBdWRpZW5jZSJ9.UFiaAPrtdZcLgilNfni6v0c6MaqbOvOzbIrWf81YSlI", RefreshToken = "Qg8DINJk2odGohEVGmY193HCizdRTmN/06ueWanYLK4=" };

        //    // Set up your mocks here...
        //    var mockUser = new User { AccountId = 1 };
        //    _mockContext.Setup(c => c.Users).ReturnsDbSet(new List<User> { mockUser });

        //    var mockRefreshToken = new RefreshToken { Token = dto.RefreshToken, AccountId = mockUser.AccountId };
        //    _mockContext.Setup(c => c.RefreshTokens).ReturnsDbSet(new List<RefreshToken> { mockRefreshToken });

        //    // Arrange
        //    var user = new User { Id = 1, AccountId = 1, RoleId = 1 };
        //    var role = new Role { Id = 1, Name = "admin" };
        //    var account = new Account { Id = 1, Username = "testUser", Password = "" };

        //    var roles = new List<Role> { role };
        //    var accounts = new List<Account> { account };
        //    var users = new List<User> { user };

        //    // Create a mock context
        //    _mockContext.Setup(c => c.Roles).ReturnsDbSet(roles);
        //    _mockContext.Setup(c => c.Accounts).ReturnsDbSet(accounts);
        //    _mockContext.Setup(c => c.Users).ReturnsDbSet(users);

        //    // Act
        //    var result = await _controller.RenewToken(dto);

        //    // Assert
        //    var okResult = Assert.IsType<OkObjectResult>(result);
        //    var response = Assert.IsType<ApiResponseDTO>(okResult.Value);
        //    Assert.Equal("Genarate token successfully", response.Message);

        //}

        [Fact]
        public async Task RenewToken_ThrowsException_WhenCalledWithValidDto()
        {
            // Arrange
            var dto = new TokenDTO { AccessToken = "validAccessToken", RefreshToken = "validRefreshToken" };

            // Set up your mocks here...
            // For example:
            var mockUser = new User { AccountId = 1 };
            _mockContext.Setup(c => c.Users).Throws<Exception>();

            var mockRefreshToken = new RefreshToken { Token = dto.RefreshToken, AccountId = mockUser.AccountId };
            _mockContext.Setup(c => c.RefreshTokens).ReturnsDbSet(new List<RefreshToken> { mockRefreshToken });

            // Act & Assert
            var exception = await _controller.RenewToken(dto);
            Assert.Equal(StatusCodes.Status500InternalServerError, ((ObjectResult)exception).StatusCode);
        }



    }

}

using AutoMapper;
using BHYT.API.Controllers;
using BHYT.API.Models.DbModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Newtonsoft.Json;

namespace BHYT.API.Tests
{
    public class InsurancePaymentControllerTests
    {
        private readonly InsurancePaymentController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;
        private readonly Mock<IMapper> _mockMapper;

        public InsurancePaymentControllerTests()    
        {

            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _mockMapper = new Mock<IMapper>();
            _mockMapper.Setup(m => m.ConfigurationProvider).Returns(() => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<InsurancePayment, InsurancePaymentDTO>();
            }));
            _controller = new InsurancePaymentController(_mockContext.Object, _mockMapper.Object);

        }


        [Fact]
        public void GetUserInsurancePayment_ReturnsNotFound_WhenNoPaymentsExist()
        {
            // Arrange
            var testId = 1;

            // Create a list of insurance payments
            var insurancePayments = new List<InsurancePayment>();

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Provider).Returns(insurancePayments.AsQueryable().Provider);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Expression).Returns(insurancePayments.AsQueryable().Expression);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.ElementType).Returns(insurancePayments.AsQueryable().ElementType);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.GetEnumerator()).Returns(insurancePayments.GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

            // Act
            var result = _controller.GetUserInsurancePayment(testId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetUserInsurancePayment_ReturnsData_WhenPaymentsExist()
        {
            // Arrange
            var testId = 1;
            var insurancePayment = new InsurancePayment { CustomerId = testId };

            // Create a list of insurance payments
            var insurancePayments = new List<InsurancePayment> { insurancePayment };

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Provider).Returns(insurancePayments.AsQueryable().Provider);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Expression).Returns(insurancePayments.AsQueryable().Expression);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.ElementType).Returns(insurancePayments.AsQueryable().ElementType);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.GetEnumerator()).Returns(insurancePayments.GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

            // Create the controller with the mock context and mapper
            var _controller = new InsurancePaymentController(_mockContext.Object, _mockMapper.Object);

            // Act
            var result =  _controller.GetUserInsurancePayment(testId);
            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var expectedJson = "{\"insurancePayments\":[{\"Guid\":null,\"PolicyId\":null,\"Date\":null,\"Amount\":null,\"Status\":null,\"Type\":null,\"Note\":null,\"SubscriptionId\":null}]}";
            var actualJson = JsonConvert.SerializeObject(okResult.Value);
            Assert.Equal(expectedJson, actualJson);

        }


        [Fact]
        public void GetUserInsurancePayment_ReturnsConflict_WhenExceptionOccurs()
        {
            // Arrange
            var testId = 1;

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Provider).Throws<Exception>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Expression).Throws<Exception>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.ElementType).Throws<Exception>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.GetEnumerator()).Throws<Exception>();

            // Create a mock context
            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

            // Create the controller with the mock context and mapper
            var _controller = new InsurancePaymentController(_mockContext.Object, _mockMapper.Object);

            // Act
            var result = _controller.GetUserInsurancePayment(testId);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public void GetAllUserInsurancePayments_ReturnsNotFound_WhenNoPaymentsExist()
        {
            // Arrange
            var insurancePayments = new List<InsurancePayment>();

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Provider).Returns(insurancePayments.AsQueryable().Provider);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Expression).Returns(insurancePayments.AsQueryable().Expression);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.ElementType).Returns(insurancePayments.AsQueryable().ElementType);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.GetEnumerator()).Returns(insurancePayments.GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

            // Act
            var result = _controller.GetAllUserInsurancePayments();

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetAllUserInsurancePayments_ReturnsData_WhenPaymentsExist()
        {
            // Arrange
            var insurancePayment = new InsurancePayment { CustomerId = 1 };

            // Create a list of insurance payments
            var insurancePayments = new List<InsurancePayment> { insurancePayment };

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Provider).Returns(insurancePayments.AsQueryable().Provider);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Expression).Returns(insurancePayments.AsQueryable().Expression);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.ElementType).Returns(insurancePayments.AsQueryable().ElementType);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.GetEnumerator()).Returns(insurancePayments.GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

            // Act
            var result = _controller.GetAllUserInsurancePayments();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);

            var insurancePaymentDTO = new InsurancePaymentDTO
            {
                Guid = null,
                PolicyId = null,
                Date = null,
                Amount = null,
                Status = null,
                Type = null,
                Note = null,
                SubscriptionId = null
            };

            // This is what we expect the controller action to return
            var expectedValue = new { insurancePayments = new List<InsurancePaymentDTO> { insurancePaymentDTO } };

            // Serialize the expected value to a JSON string
            var expectedJson = JsonConvert.SerializeObject(expectedValue);
            var actualJson = JsonConvert.SerializeObject(okResult.Value);
            Assert.Equal(expectedJson, actualJson);
        }

        [Fact]
        public void GetAllUserInsurancePayments_ReturnsConflict_WhenExceptionOccurs()
        {
            // Arrange
            var insurancePayments = new List<InsurancePayment>();

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Provider).Throws<Exception>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Expression).Throws<Exception>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.ElementType).Throws<Exception>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.GetEnumerator()).Throws<Exception>();

            // Create a mock context
            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

            // Act
            var result = _controller.GetAllUserInsurancePayments();

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public void DeleteUserInsurancePayment_ReturnsNotFound_WhenPaymentDoesNotExist()
        {
            // Arrange
            var guid = Guid.NewGuid();

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Provider).Returns(Enumerable.Empty<InsurancePayment>().AsQueryable().Provider);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Expression).Returns(Enumerable.Empty<InsurancePayment>().AsQueryable().Expression);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.ElementType).Returns(Enumerable.Empty<InsurancePayment>().AsQueryable().ElementType);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.GetEnumerator()).Returns(Enumerable.Empty<InsurancePayment>().GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

            // Act
            var result = _controller.DeleteUserInsurancePayment(guid);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void DeleteUserInsurancePayment_ReturnsOk_WhenPaymentExists()
        {
            // Arrange
            var guid = Guid.NewGuid();
            var insurancePayment = new InsurancePayment { Guid = guid };

            // Create a list of insurance payments
            var insurancePayments = new List<InsurancePayment> { insurancePayment };

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Provider).Returns(insurancePayments.AsQueryable().Provider);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Expression).Returns(insurancePayments.AsQueryable().Expression);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.ElementType).Returns(insurancePayments.AsQueryable().ElementType);
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.GetEnumerator()).Returns(insurancePayments.GetEnumerator());

            // Create a mock context
            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

            // Act
            var result = _controller.DeleteUserInsurancePayment(guid);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void DeleteUserInsurancePayment_ReturnsConflict_WhenExceptionOccurs()
        {
            // Arrange
            var guid = Guid.NewGuid();

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.As<IQueryable<InsurancePayment>>().Setup(m => m.Provider).Throws<Exception>();

            // Create a mock context
            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

            // Act
            var result = _controller.DeleteUserInsurancePayment(guid);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public void CreateInsurancePayment_ReturnsOk_WhenPaymentIsCreated()
        {
            // Arrange
            var customerId = 1;
            var insurancePaymentDTO = new InsurancePaymentDTO
            {
                PolicyId = 1,
                Amount = 100.0,
                Status = true,
                Type = "Type1",
                Note = "Note1"
            };

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.Setup(m => m.Add(It.IsAny<InsurancePayment>()));

            // Create a mock context

            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);
            _mockContext.Setup(c => c.SaveChanges());

            _mockMapper.Setup(m => m.Map<InsurancePayment>(It.IsAny<InsurancePaymentDTO>())).Returns(new InsurancePayment());


            // Act
            var result = _controller.CreateInsurancePayment(customerId, insurancePaymentDTO);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void CreateInsurancePayment_ReturnsConflict_WhenExceptionOccurs()
        {
            // Arrange
            var customerId = 1;
            var insurancePaymentDTO = new InsurancePaymentDTO
            {
                PolicyId = 1,
                Amount = 100.0,
                Status = true,
                Type = "Type1",
                Note = "Note1"
            };

            // Create a mock DbSet
            var mockSet = new Mock<DbSet<InsurancePayment>>();
            mockSet.Setup(m => m.Add(It.IsAny<InsurancePayment>())).Throws<Exception>();

            _mockContext.Setup(c => c.InsurancePayments).Returns(mockSet.Object);

          
            _mockMapper.Setup(m => m.Map<InsurancePayment>(It.IsAny<InsurancePaymentDTO>())).Returns(new InsurancePayment());

          

            // Act
            var result = _controller.CreateInsurancePayment(customerId, insurancePaymentDTO);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }




    }
}
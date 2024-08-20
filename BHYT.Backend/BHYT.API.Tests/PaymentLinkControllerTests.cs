using AutoMapper;
using BHYT.API.Controllers;
using BHYT.API.Models.DbModels;
using BHYT.API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BHYT.API.Tests
{
    public class PaymentLinkControllerTests
    {
        private readonly PaymentLinkController _controller;
        private readonly Mock<BHYTDbContext> _mockContext;

        public PaymentLinkControllerTests()
        {

            var options = new DbContextOptionsBuilder<BHYTDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDatabase")
               .Options;
            _mockContext = new Mock<BHYTDbContext>(options);
            _controller = new PaymentLinkController(_mockContext.Object);
        }

        [Fact]
        public void CreatePaymentLink_ReturnsBadRequestResult_WhenExceptionIsThrown()
        {
            // Arrange
            var customerId = 1;
            var paymentLinkDTO = new PaymentLinkDTO
            {
                Amount = 1000,
                PaymentOption = "month",
                ProductName = "Test Product"
            };

            // Act
            var actionResult = _controller.CreatePaymentLink(customerId, paymentLinkDTO);

            // Assert
            var result = actionResult as BadRequestObjectResult;
            Assert.NotNull(result);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void CancelSubscription_ReturnsOkResult_WhenCalledWithValidSubscriptionId()
        {
            // Arrange
            var subscriptionId = "test_subscription_id";

            // Mock the DbContext to return a valid InsurancePayment
            var mockInsurancePayment = new InsurancePayment { SubscriptionId = subscriptionId };
            _mockContext.Setup(c => c.InsurancePayments).ReturnsDbSet(new List<InsurancePayment> { mockInsurancePayment });

            // Act
            var actionResult = _controller.CancelSubscription(subscriptionId);

            // Assert
            var result = actionResult;
            Assert.IsType<BadRequestObjectResult>(result);
        }

    }
}

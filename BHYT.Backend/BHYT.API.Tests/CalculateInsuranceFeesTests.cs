using BHYT.API.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BHYT.API.Tests
{
    public class CalculateInsuranceFeesTests
    {
        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithValidInputs()
        {
            // Arrange
            int age = 30;
            string gender = "Nam";
            string healthStatus = "Khỏe mạnh";
            bool smoking = false;
            int coverageAmount = 1000000;
            int coverageTerm = 1;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(120000.0000m, premium); // 1.2 (age factor) * 1.2 (gender factor) * 1.0 (health factor) * 1.0 (smoking factor) * 1000000 (base premium)
        }

        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithDifferentInputs()
        {
            // Arrange
            int age = 50;
            string gender = "Nữ";
            string healthStatus = "Có vấn đề sức khỏe";
            bool smoking = true;
            int coverageAmount = 1000000;
            int coverageTerm = 1;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(280000.0000m, premium); // 1.6 (age factor) * 1.0 (gender factor) * 1.4 (health factor) * 1.5 (smoking factor) * 1000000 (base premium)
        }

        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithMinimumInputs()
        {
            // Arrange
            int age = 20;
            string gender = "Nam";
            string healthStatus = "Khỏe mạnh";
            bool smoking = false;
            int coverageAmount = 1000000;
            int coverageTerm = 1;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(100000.0000m, premium); // 1.0 (age factor) * 1.2 (gender factor) * 1.0 (health factor) * 1.0 (smoking factor) * 1000000 (base premium)
        }

        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithMaximumInputs()
        {
            // Arrange
            int age = 70;
            string gender = "Nữ";
            string healthStatus = "Có vấn đề sức khỏe";
            bool smoking = true;
            int coverageAmount = 1000000;
            int coverageTerm = 1;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(350000.0000m, premium); // 2.0 (age factor) * 1.0 (gender factor) * 1.6 (health factor) * 1.5 (smoking factor) * 1000000 (base premium)
        }

        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithAge40()
        {
            // Arrange
            int age = 40;
            string gender = "Nam";
            string healthStatus = "Khỏe mạnh";
            bool smoking = false;
            int coverageAmount = 1000000;
            int coverageTerm = 1;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(140000.0000m, premium); // 1.4 (age factor) * 1.2 (gender factor) * 1.0 (health factor) * 1.0 (smoking factor) * 1000000 (base premium)
        }

        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithAge50AndFemaleAndHealthIssuesAndSmoker()
        {
            // Arrange
            int age = 50;
            string gender = "Nữ";
            string healthStatus = "Có vấn đề sức khỏe";
            bool smoking = true;
            int coverageAmount = 1000000;
            int coverageTerm = 1;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(280000.0000m, premium); // 1.6 (age factor) * 1.0 (gender factor) * 1.4 (health factor) * 1.5 (smoking factor) * 1000000 (base premium)
        }

        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithAge60AndMaleAndNormalHealthAndNonSmoker()
        {
            // Arrange
            int age = 60;
            string gender = "Nam";
            string healthStatus = "Bình thường";
            bool smoking = false;
            int coverageAmount = 1000000;
            int coverageTerm = 1;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(216000.0000m, premium); // 1.8 (age factor) * 1.2 (gender factor) * 1.2 (health factor) * 1.0 (smoking factor) * 1000000 (base premium)
        }

        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithAgeOver60()
        {
            // Arrange
            int age = 70;
            string gender = "Nam";
            string healthStatus = "Khỏe mạnh";
            bool smoking = false;
            int coverageAmount = 1000000;
            int coverageTerm = 1;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(200000.0000m, premium); // 2.0 (age factor) * 1.2 (gender factor) * 1.0 (health factor) * 1.0 (smoking factor) * 1000000 (base premium)
        }

        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithUnknownHealthStatus()
        {
            // Arrange
            int age = 30;
            string gender = "Nam";
            string healthStatus = "Unknown";
            bool smoking = false;
            int coverageAmount = 1000000;
            int coverageTerm = 1;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(192000.0000m, premium); // 1.2 (age factor) * 1.2 (gender factor) * 1.6 (health factor) * 1.0 (smoking factor) * 1000000 (base premium)
        }

        [Fact]
        public void CalculateInsurancePremium_ReturnsCorrectPremium_WhenCalledWithCoverageTermNotEqualOne()
        {
            // Arrange
            int age = 30;
            string gender = "Nam";
            string healthStatus = "Khỏe mạnh";
            bool smoking = false;
            int coverageAmount = 1000000;
            int coverageTerm = 2;

            // Act
            decimal premium = CalculateInsuranceFees.CalculateInsurancePremium(age, gender, healthStatus, smoking, coverageAmount, coverageTerm);

            // Assert
            Assert.Equal(1440000.0000m, premium); // 1.2 (age factor) * 1.2 (gender factor) * 1.0 (health factor) * 1.0 (smoking factor) * 1000000 (base premium)
        }



    }


}

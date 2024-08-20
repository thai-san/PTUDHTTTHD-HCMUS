namespace BHYT.API.Models.DTOs
{
    public class HealthIndicatorDTO
    {
        public int CustomerId { get; set; }

        public float? Height { get; set; }

        public float? Weight { get; set; }

        public float? Cholesterol { get; set; }

        public float? BMI { get; set; }

        public int? BPM { get; set; } // nhịp tim

        public int? RespiratoryRate { get; set; }
        public string? BloodPressure { get; set; }

        public string? PersonDiseases { get; set; }
        public string? FamilyDiseases { get; set; }

        public string? Pregnant { get; set; } // thai sản
        public string? Drug { get; set; }  // Thuốc 
        public DateTime? LastestUpdate { get; set; }

    }
}

namespace BHYT.API.Models.DTOs
{
    public class AddNewPolicyDTO
    {
        public string StartDate { get; set; }
        public int Year { get; set; }
        public int Option { get; set; }
        public int CustomerId { get; set; }
        public int InsuranceId { get; set; }
    }
}

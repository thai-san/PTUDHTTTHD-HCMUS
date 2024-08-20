using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BHYT.API.Models.DbModels;

public partial class CustomerPolicy
{
    public int Id { get; set; }

    public Guid? Guid { get; set; }

    public int? CustomerId { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? EndDate { get; set; }

    public double? PremiumAmount { get; set; }

    public bool? PaymentOption { get; set; }  // loại thanh toán true: Tháng, false : năm

    public string? CoverageType { get; set; }

    public double? DeductibleAmount { get; set; }

    public int? BenefitId { get; set; }

    public int? InsuranceId { get; set; }

    public DateTime? LatestUpdate { get; set; }

    public string? Description { get; set; }

    public bool? Status { get; set; } // true: duyệt r , false: chưa duyệt , null: loại bỏ

    public string? Company { get; set; }

    public string ImageName { get; set; }

    [NotMapped]
    public IFormFile ImageFile { get; set; }

    [NotMapped]
    public string ImageSrc { get; set; }

}

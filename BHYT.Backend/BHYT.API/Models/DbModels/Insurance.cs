 using System;
using System.Collections.Generic;

namespace BHYT.API.Models.DbModels;

public partial class Insurance
{
    public int Id { get; set; }

    public Guid? Guid { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? InsuranceTypeId { get; set; }

    public byte? StartAge { get; set; }

    public byte? EndAge { get; set; }

    public float? Price { get; set;}

    public string? subInsuranceTypeName { get; set; }

    public string? Slogan { get; set; }


}

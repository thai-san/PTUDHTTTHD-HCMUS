using System;
using System.Collections.Generic;

namespace BHYT.API.Models.DbModels;

public partial class InsuranceType
{
    public int Id { get; set; }

    public Guid? Guid { get; set; }

    public string? Name { get; set; }

    public string? Summary { get; set; }
    public string? Description { get; set; }
    public string? Benefit { get; set; }    
    public double? Price { get; set; }

}

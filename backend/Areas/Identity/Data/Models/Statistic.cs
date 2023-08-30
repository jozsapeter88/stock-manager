using System.ComponentModel.DataAnnotations.Schema;

namespace StockBackend.Areas.Identity.Data.Models;

public class Statistic
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string FacilityName { get; set; }
    public int OverallItems { get; set; }
    public int OverallValue { get; set; }
}
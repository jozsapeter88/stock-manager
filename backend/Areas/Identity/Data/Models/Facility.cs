using System.ComponentModel.DataAnnotations.Schema;
using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Areas.Identity.Data.Models;

public class Facility
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }
    public SportEnum Sport { get; set; }
    public string CountryCode { get; set;}
    public string PostCode { get; set; }
    public string City { get; set; }
    public string Address { get; set; }
    public List<Item>? Items { get; set; }
    public List<User>? Users { get; set; }
}
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Models;

public class Facility
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }
    public CategoryEnum Category { get; set; }
    public string CountryCode { get; set;}
    public string PostCode { get; set; }
    public string City { get; set; }
    public string Address { get; set; }

    public List<Item>? Items { get; set; } = new List<Item>();

    [JsonIgnore] public List<User>? Users { get; set; } 
}


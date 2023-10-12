using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Models.DTO;

public class FacilityDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public CategoryEnum Category { get; set; }
    public string CountryCode { get; set;}
    public string PostCode { get; set; }
    public string City { get; set; }
    public string Address { get; set; }
}
namespace StockBackend.Models.DTO;

public class OrderDto
{
    public string Comment { get; set; }
    public Facility Facility { get; set; }
    public List<ItemQuantityDto> ItemQuantities { get; set; }
}
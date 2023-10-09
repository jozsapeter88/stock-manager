namespace StockBackend.Models.DTO;

public class OrderDto
{
    public string Comment { get; set; }
    public long FacilityId { get; set; }
    
    public long SupplierId { get; set; }
    public List<ItemQuantityDto> ItemQuantities { get; set; }
}
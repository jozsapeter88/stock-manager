namespace StockBackend.Models.DTO;

public class DispatchDto
{
    public string Comment { get; set; }
    public long FacilityId { get; set; }
    public long ItemId { get; set; }
    public int Quantity { get; set; }
}
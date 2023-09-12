namespace StockBackend.Models.DTO;

public class OrderDto
{
    public int Quantity { get; set; }
    public string Comment { get; set; }
    public Facility Facility { get; set; }
    public List<Item> Items { get; set; }
}
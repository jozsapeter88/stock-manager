using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Models.DTO;

public class ItemDto
{
    public string Name { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public int SuggestedQuantity { get; set; }
}
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Models;

public class Item
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string? Name { get; set; }
    public SportEnum Sport { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; } = 0;
    public int SuggestedQuantity { get; set; }

    // Initialize collections in the constructor to avoid null issues

    public List<OrderItemQuantity> OrderItemQuantities { get; set; } = new List<OrderItemQuantity>();
}
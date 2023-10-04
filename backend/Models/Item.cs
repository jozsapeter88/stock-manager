using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Models;

/*public class Item
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    public SportEnum Sport { get; set; }
    public double Price { get; set; }

    public int? Quantity { get; set; }

    // public List<Order>? OrderList { get; set; }
    [JsonIgnore] public List<OrderItemQuantity>? OrderItemQuantities { get; set; }
    public List<Facility>? FacilitiesHavingItem { get; set; }
}*/

public class Item
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string? Name { get; set; }
    public SportEnum Sport { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; } = 0;

    // Initialize collections in the constructor to avoid null issues

    public List<OrderItemQuantity> OrderItemQuantities { get; set; } = new List<OrderItemQuantity>();
}
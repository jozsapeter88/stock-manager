using System.ComponentModel.DataAnnotations.Schema;
using StockBackend.Areas.Identity.Data.Models;

namespace StockBackend.Models;
public class Order
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }

    // Facility of Order
    public long FacilityId { get; set; }
    public Facility Facility { get; set; }

    // Supplier of Order
    public long SupplierId { get; set; }
    public Supplier Supplier { get; set; }
    
    //Item/Quantity pairs of Order
    public List<OrderItemQuantity> OrderItemQuantities { get; set; } = new List<OrderItemQuantity>();

    // User of Order
    public string UserId { get; set; }
    public User UserOfOrder { get; set; }
    public bool IsDelivered { get; set; } = false;
}
using System.ComponentModel.DataAnnotations.Schema;
using StockBackend.Areas.Identity.Data.Models;

namespace StockBackend.Models;

/*public class Order
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public Facility Facility { get; set; }
    
    public List<OrderItemQuantity> OrderItemQuantities { get; set; }
    public User UserOfOrder { get; set; }
    public bool IsDelivered { get; set; } = false;
}*/

public class Order
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }

    // Use foreign key
    public long FacilityId { get; set; }
    public Facility Facility { get; set; }

    public List<OrderItemQuantity> OrderItemQuantities { get; set; } = new List<OrderItemQuantity>();

    // Use foreign key
    public string UserId { get; set; }
    public User UserOfOrder { get; set; }
    public bool IsDelivered { get; set; } = false;
}
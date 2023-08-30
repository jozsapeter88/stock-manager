using System.ComponentModel.DataAnnotations.Schema;

namespace StockBackend.Areas.Identity.Data.Models;

public class ShippedItems
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace StockBackend.Areas.Identity.Data.Models;

public class Order
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public int Quantity { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public Facility Facility { get; set; }
    public List<Item> Items { get; set; }
}
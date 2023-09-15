using System.ComponentModel.DataAnnotations.Schema;
using StockBackend.Areas.Identity.Data.Models;

namespace StockBackend.Models;

public class Order
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public int Quantity { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public Facility Facility { get; set; }
    public List<Item> Items { get; set; }
    public User UserOfOrder { get; set; }
}
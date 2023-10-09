using System.ComponentModel.DataAnnotations.Schema;
using StockBackend.Areas.Identity.Data.Models;

namespace StockBackend.Models;

public class Dispatch
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public long ItemId { get; set; }
    public Item Item { get; set; }
    public long FacilityId { get; set; }
    public Facility Facility { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
    public int Quantity { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    
}
using System.ComponentModel.DataAnnotations.Schema;
using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Areas.Identity.Data.Models;

public class Item
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }
    public SportEnum Sport { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    
}
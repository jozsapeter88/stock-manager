using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StockBackend.Areas.Identity.Data.Models;

namespace StockBackend.Models.DBContext;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public DbSet<Facility> Facilities { get; set; }
    public DbSet<Statistic> Statistics { get; set; }
    public DbSet<ShippedItems> ShippedItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Item> Items { get; set; }
    public new DbSet<Role> Roles { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
}


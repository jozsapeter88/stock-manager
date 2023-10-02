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
    public DbSet<OrderItemQuantity> OrderItemQuantities { get; set; }
    public DbSet<Item> Items { get; set; }
    public new DbSet<Role> Roles { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); // This is crucial!

        modelBuilder.Entity<OrderItemQuantity>()
            .HasKey(o => new { o.OrderId, o.ItemId });

        modelBuilder.Entity<OrderItemQuantity>()
            .HasOne(o => o.Order)
            .WithMany(o => o.OrderItemQuantities)
            .HasForeignKey(o => o.OrderId);

        modelBuilder.Entity<OrderItemQuantity>()
            .HasOne(o => o.Item)
            .WithMany(i => i.OrderItemQuantities)
            .HasForeignKey(o => o.ItemId);
    }

}


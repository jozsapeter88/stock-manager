using Microsoft.EntityFrameworkCore;
using StockBackend.Models.DBContext;

namespace StockBackend.Service;

public class StatisticsService : IStatisticsService
{
    private readonly ApplicationDbContext _dbContext;

    public StatisticsService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public int CalculateInventoryItems(long facilityId)
    {
        var facility = _dbContext.Facilities
            .Include(f => f.Items)
            .FirstOrDefault(f => f.Id == facilityId);

        if (facility == null)
        {
            throw new InvalidOperationException("Facility not found.");
        }

        return facility.Items?.Sum(item => item.Quantity) ?? 0;
    }

    public double CalculateInventoryValue(long facilityId)
    {
        var facility = _dbContext.Facilities
            .Include(f => f.Items)
            .FirstOrDefault(f => f.Id == facilityId);

        if (facility == null)
        {
            throw new InvalidOperationException("Facility not found.");
        }

        return facility.Items?.Sum(item => item.Price * item.Quantity) ?? 0.0;
    }

    public int CalculateOrdersLinked(long facilityId)
    {
        var orders = _dbContext.Orders
            .Where(order => order.Facility.Id == facilityId)
            .ToList();

        return orders.Count;
    }
}
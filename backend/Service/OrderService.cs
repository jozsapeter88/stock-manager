using Microsoft.EntityFrameworkCore;
using StockBackend.Models;
using StockBackend.Models.DBContext;
using StockBackend.Models.DTO;

namespace StockBackend.Service;

public class OrderService: IOrderService
{
    private readonly ApplicationDbContext _dbContext;

    public OrderService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Order>?> GetOrdersOfUser(string userId)
    {
        var orders = await _dbContext.Orders
            .Include(order => order.Items)
            .Include(order => order.Facility)
            .Include(order => order.UserOfOrder)
            .Where(o => o.UserOfOrder.Id == userId)
            .ToListAsync();
        return orders;
    }

    public async Task<Order?> AddOrder(OrderDto order, string userId)
    {
        var user =  await _dbContext.Users.Include(user => user.OrdersOfUser)
            .FirstOrDefaultAsync(u => u.Id == userId);
        var newOrder = new Order();
        if (user is not null)
        {
            newOrder = new Order
            {
                Quantity = order.Quantity,
                Comment = order.Comment,
                CreatedAt = DateTime.UtcNow,
                Facility = order.Facility,
                Items = order.Items,
                UserOfOrder = user

            };
            if (user.OrdersOfUser is null)
            {
                user.OrdersOfUser = new List<Order> { newOrder };
                Console.WriteLine("if: "+ user.OrdersOfUser.Count);
            }
            else
            {
                user.OrdersOfUser.Add(newOrder);
                Console.WriteLine("else: "+ user.OrdersOfUser.Count);
            }
        }
        await _dbContext.SaveChangesAsync();
        return newOrder ?? null;
    }
    
    public async Task<bool> DeleteOrder(long orderId)
    {
        var order = await _dbContext.Orders.FindAsync(orderId);
        if (order is null)
        {
            return false;
        }

        _dbContext.Orders.Remove(order);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ConfirmOrder(long orderId)
    {
        var order = await _dbContext.Orders.FindAsync(orderId);

        if (order is null)
        {
            return false;
        }

        order.IsDelivered = true;

        return true;
    }
}
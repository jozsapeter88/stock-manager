using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
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

    public async Task<List<Order>?> GetAllOrders()
    {
        var orders = await _dbContext.Orders
            .Include(order => order.OrderItemQuantities)
            .Include(order => order.Facility)
            .Include(order => order.UserOfOrder)
            .ToListAsync();
        return orders;
    }
    
    public async Task<List<Order>?> GetOrdersOfUser(string userId)
    {
        var orders = await _dbContext.Orders
            .Include(order => order.OrderItemQuantities)
            .ThenInclude(i => i.Item)
            .Include(order => order.Facility)
            .Include(order => order.UserOfOrder)
            .Where(o => o.UserOfOrder.Id == userId)
            .ToListAsync();
        return orders;
    }

    public async Task<Order?> AddOrder(OrderDto order, string userId)
    {
        var user =  await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == userId)!;
        var facility = await _dbContext.Facilities
            .FirstOrDefaultAsync(f => f.Id == order.FacilityId);
        var newOrder = new Order();
        if (user is not null)
        {
            newOrder = new Order
            {
                Comment = order.Comment,
                CreatedAt = DateTime.UtcNow,
                Facility = facility!,
                OrderItemQuantities = new List<OrderItemQuantity>(),
                UserOfOrder = user
            };
            foreach (var iq in order.ItemQuantities)
            {
                var item = await _dbContext.Items.FirstOrDefaultAsync(i => i.Id ==iq.ItemId);
                if (item != null)
                {
                    var orderItemQuantity = new OrderItemQuantity
                    {
                        Item = item,
                        Quantity = iq.Quantity
                    };
                    newOrder.OrderItemQuantities.Add(orderItemQuantity);
                }
            }
        }
        _dbContext.Orders.Add(newOrder); 
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
        var order = await _dbContext.Orders
            .Include(order => order.Facility)
            .ThenInclude(facility => facility.Items)
            .Include(order => order.OrderItemQuantities)
            .ThenInclude(o => o.Item)
            .FirstOrDefaultAsync(order => order.Id == orderId);
        
        if (order is null)
        {
            return false;
        }
        order.IsDelivered = true;
        var facility =  order.Facility;
        IncreaseOrderItemsQuantity(order.OrderItemQuantities, facility.Items!);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private void AddItemsToFacility(List<OrderItemQuantity> orderedItems, List<Item> facilityItems)
    {
        if (facilityItems.Count == 0 )
        {
            foreach (var orderItemQuantity in orderedItems)
            {
                facilityItems.Add(orderItemQuantity.Item);
            }
        }
        else
        {
            foreach (var orderedItem in orderedItems)
            {
                if (!CheckIfFacilityHavingItem(orderedItem.Item, facilityItems))
                {
                    facilityItems.Add(orderedItem.Item);
                }
            }
        }
    }

    private bool CheckIfFacilityHavingItem(Item item, List<Item> itemsOfFacility)
    {
        return itemsOfFacility.Any(itemFacility => itemFacility.Name == item.Name);
    }

    private  void IncreaseOrderItemsQuantity(List<OrderItemQuantity> orderedItems, List<Item> itemsOfFacility)
    {
        AddItemsToFacility(orderedItems, itemsOfFacility);
       foreach (var orderedItem in orderedItems)
        {
            foreach (var item in itemsOfFacility)
            {
                if (orderedItem.Item.Name == item.Name)
                {
                    item.Quantity += orderedItem.Quantity;
                }
            }
        }
    }
}
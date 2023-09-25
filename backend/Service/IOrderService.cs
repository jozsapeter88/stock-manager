using StockBackend.Models;
using StockBackend.Models.DTO;

namespace StockBackend.Service;

public interface IOrderService
{
    Task<List<Order>?>? GetOrdersOfUser(string userId);
    Task<Order?> AddOrder(OrderDto order, string userId);
    Task<bool> DeleteOrder(long orderId);
    Task<bool> ConfirmOrder(long orderId);
}
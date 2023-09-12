using StockBackend.Models;

namespace StockBackend.Service;

public interface IItemService
{
    Task<List<Item>?> GetItems();
}
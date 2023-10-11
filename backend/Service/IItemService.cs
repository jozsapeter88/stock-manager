using StockBackend.Models;
using StockBackend.Models.DTO;

namespace StockBackend.Service;

public interface IItemService
{
    Task<List<Item>?> GetItems();
    Task<Item>? AddItem(Item item);

    Task<Dispatch?> AddDispatch(DispatchDto dispatchDto, string userId);

    Task<List<Dispatch>?> GetAllDispatch(string userId);
}
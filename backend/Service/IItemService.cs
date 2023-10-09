using StockBackend.Models;
using StockBackend.Models.DTO;

namespace StockBackend.Service;

public interface IItemService
{
    Task<List<Item>?> GetItems();

    Task<Dispatch?> AddDispatch(DispatchDto dispatchDto, string userId);
}
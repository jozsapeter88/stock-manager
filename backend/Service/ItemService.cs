using Microsoft.EntityFrameworkCore;
using StockBackend.Models;
using StockBackend.Models.DBContext;

namespace StockBackend.Service;

public class ItemService: IItemService
{
    private readonly ApplicationDbContext _dbContext;

    public ItemService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Item>?> GetItems()
    {
        var items = await _dbContext.Items.ToListAsync();
        return items ?? null;
    }
}
using Microsoft.EntityFrameworkCore;
using StockBackend.Models;
using StockBackend.Models.DBContext;
using StockBackend.Models.DTO;

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

    public async Task<Dispatch?> AddDispatch(DispatchDto dispatchDto, string userId)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == userId);
        var facility = await _dbContext.Facilities
            .FirstOrDefaultAsync(f => f.Id == dispatchDto.FacilityId);
        var item = await _dbContext.Items
            .FirstOrDefaultAsync(i => i.Id == dispatchDto.ItemId);
        var newDispatch = new Dispatch();

        if (item is not null && user is not null && facility is not null)
        {
            newDispatch = new Dispatch()
            {
                Comment = dispatchDto.Comment,
                CreatedAt = DateTime.UtcNow,
                Facility = facility,
                Item = item,
                User = user,
                Quantity = dispatchDto.Quantity
            };
        }
        CalculateRemainingItems(newDispatch.Item, newDispatch.Quantity);
        _dbContext.Dispatches.Add(newDispatch);
        await _dbContext.SaveChangesAsync();
        return newDispatch;
    }

    private void CalculateRemainingItems(Item? item, int quantity)
    {
        if (item is not null)
        {
            item.Quantity -= quantity;
        }
    }
}
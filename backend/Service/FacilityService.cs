using Microsoft.EntityFrameworkCore;
using StockBackend.Areas.Identity.Data;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Models;
using StockBackend.Models.DBContext;

namespace StockBackend.Service;

public class FacilityService: IFacilityService
{
    private readonly ApplicationDbContext _dbContext;

    public FacilityService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Facility>?> GetAllFacility()
    {
        var result = await _dbContext.Facilities.ToListAsync();

        return result ?? null;

    }

    public async Task<List<Facility>?> GetFacilitiesOfUser(string userId)
    {
        var user = await _dbContext.Users
            .Include(u => u.FacilitiesOfUser)
            .FirstOrDefaultAsync(u => u.Id == userId);
        return user?.FacilitiesOfUser?.ToList();
    }

    public async Task<Facility?>? GetFacility(int fId)
    {
        var facility = await _dbContext.Facilities.FirstOrDefaultAsync(f => f.Id == fId);
        return facility ?? null;
    }

    public async Task<Facility?> AddFacilityToUser(int fId, string userId)
    {
        var facility = await _dbContext.Facilities.FirstOrDefaultAsync(f => f.Id == fId);
        var user =  await _dbContext.Users.Include(user => user.FacilitiesOfUser)
            .FirstOrDefaultAsync(u => u.Id == userId);
        if (user is not null)
        {
            if (facility is not null)
            {
                if (user.FacilitiesOfUser is null)
                {
                    user.FacilitiesOfUser = new List<Facility> { facility };
                    Console.WriteLine("if: "+ user.FacilitiesOfUser.Count);
                }
                else
                {
                    user.FacilitiesOfUser.Add(facility);
                    Console.WriteLine("else: "+ user.FacilitiesOfUser.Count);
                }
            }
        }
        await _dbContext.SaveChangesAsync();
        return facility ?? null;
    }
}
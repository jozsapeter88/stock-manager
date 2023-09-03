using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Models;

namespace StockBackend.Service;

public interface IFacilityService
{
    Task<List<Facility>?> GetAllFacility();
    Task<List<Facility>?> GetFacilitiesOfUser(string userId);

    Task<Facility?> AddFacilityToUser(int fId, string userId);
}
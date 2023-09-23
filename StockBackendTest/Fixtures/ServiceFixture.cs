using Microsoft.EntityFrameworkCore;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Areas.Identity.Enums;
using StockBackend.Models;
using StockBackend.Models.DBContext;

namespace StockBackendTest.Fixtures;

public class ServiceFixture : IDisposable
{
    public async Task<(User, Facility, List<Item>)> AddUserAndFacilityToInMemoryDb(DbContextOptions<ApplicationDbContext> options)
    {
        await using var context = new ApplicationDbContext(options);
        var userToAdd = new User
        {
            Id = "test-Id",
            UserName = "testUser",
            Email = "testUser@example.com",
            Role = RoleEnum.User
        };
        context.Users.Add(userToAdd);

        var facilityToAdd = new Facility()
        {
            Id = 1,
            Name = "TestFacility",
            Sport = SportEnum.Soccer,
            CountryCode = "ExampleCode",
            PostCode = "ExamplePostCode",
            City = "TestCity",
            Address = "TestAddress",
        };
        context.Facilities.Add(facilityToAdd);
        var itemsToAdd = new List<Item>()
        {
            new Item()
            {
                Id = 1,
                Name = "Boxing Gloves",
                Sport = SportEnum.CombatSports,
                Price = 79.99,
                Quantity = 10
            },
            new Item()
            {
                Id = 2,
                Name = "Mouthguard",
                Sport = SportEnum.CombatSports,
                Price = 9.99,
                Quantity = 20
            }
        };
         context.AddRange(itemsToAdd);
        await context.SaveChangesAsync();
        return (userToAdd, facilityToAdd, itemsToAdd);
    }
    
    public void Dispose()
    {
        
    }
}
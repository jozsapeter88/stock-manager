using Microsoft.EntityFrameworkCore;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Areas.Identity.Enums;
using StockBackend.Models;
using StockBackend.Models.DBContext;

namespace StockBackendTest.Fixtures;

public class ServiceFixture //: IDisposable
{
  public async Task<(List<User>, Facility, List<Item>)> AddUserAndFacilityToInMemoryDb(DbContextOptions<ApplicationDbContext> options)
{
    await using var context = new ApplicationDbContext(options);

    // Seed Users
    var users = new List<User>
    {
        new User
        {
            Id = "test-Id",
            UserName = "testUser",
            Email = "testUser@example.com",
            Role = RoleEnum.User
        },
        new User
        {
            Id = "test-Id2",
            UserName = "testUserAlreadyHasFacility",
            Email = "testUser2@example.com",
            Role = RoleEnum.User,
            FacilitiesOfUser = new List<Facility>
            {
                new Facility
                {
                    Id = 2,
                    Name = "TestFacilityUserAlreadyHas",
                    Sport = SportEnum.Soccer,
                    CountryCode = "ExampleCode",
                    PostCode = "ExamplePostCode",
                    City = "TestCity",
                    Address = "TestAddress"
                }
            }
        }
    };
    context.Users.AddRange(users);

    // Seed Facility
    var facility = new Facility
    {
        Id = 1,
        Name = "TestFacility",
        Sport = SportEnum.Soccer,
        CountryCode = "ExampleCode",
        PostCode = "ExamplePostCode",
        City = "TestCity",
        Address = "TestAddress"
    };
    context.Facilities.Add(facility);

    // Seed Items
    var items = new List<Item>
    {
        new Item
        {
            Id = 1,
            Name = "Boxing Gloves",
            Sport = SportEnum.CombatSports,
            Price = 79.99,
            
        },
        new Item
        {
            Id = 2,
            Name = "Mouthguard",
            Sport = SportEnum.CombatSports,
            Price = 9.99,
            
        }
    };
    context.Items.AddRange(items);

    await context.SaveChangesAsync();

    return (users, facility, items);
}


   /* public void Dispose()
    {
        
    }*/
}
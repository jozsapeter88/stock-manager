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

        // Declare the variables
        User user;
        Facility facility;
        List<Item> items;

        // Check if the database is empty and seed if necessary
        if (!context.Users.Any())
        {
            user = new User
            {
                Id = "test-Id",
                UserName = "testUser",
                Email = "testUser@example.com",
                Role = RoleEnum.User
            };
            context.Users.Add(user);
        }
        else
        {
            user = await context.Users.FirstOrDefaultAsync(user => user.Id == "test-Id" );
        }

        if (!context.Facilities.Any())
        {
            facility = new Facility()
            {
                Id = 1,
                Name = "TestFacility",
                Sport = SportEnum.Soccer,
                CountryCode = "ExampleCode",
                PostCode = "ExamplePostCode",
                City = "TestCity",
                Address = "TestAddress",
            };
            context.Facilities.Add(facility);
        }
        else
        {
            facility = await context.Facilities.FirstOrDefaultAsync(facility => facility.Id == 1);
        }

        if (!context.Items.Any())
        {
            items = new List<Item>()
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
            context.AddRange(items);
        }
        else
        {
            items = context.Items.ToList();
        }

        await context.SaveChangesAsync();

        return (user, facility, items)!;
    }
    public void Dispose()
    {
        
    }
}
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Models.DBContext;

public class DataSeed
{
  
    public static void Initialize(ApplicationDbContext dbContext)
    {
        if (!dbContext.Facilities.Any())
        {
            var facilities = new[]
            {
                new Facility()
                {
                    //Id = 12,
                    Name = "Thunderdome Arena",
                    Sport = SportEnum.CombatSports,
                    CountryCode = "US",
                    PostCode = "12345",
                    City = "Reactville",
                    Address = "123 Main Street"
                },
                // Stormwatch Stadium
                new Facility()
                {
                    //Id = 2,
                    Name = "Stormwatch Stadium",
                    Sport = SportEnum.Soccer,
                    CountryCode = "UK",
                    PostCode = "67890",
                    City = "Reactville",
                    Address = "456 High Street"
                },
                // Gridiron Grounds
                new Facility()
                {
                    // Id = 3,
                    Name = "Gridiron Grounds",
                    Sport = SportEnum.AmericanFootball,
                    CountryCode = "US",
                    PostCode = "54321",
                    City = "Reactville",
                    Address = "789 Elm Avenue"
                },
                // Mystic Court
                new Facility()
                {
                    // Id = 4,
                    Name = "Mystic Court",
                    Sport = SportEnum.Basketball,
                    CountryCode = "US",
                    PostCode = "13579",
                    City = "Reactville",
                    Address = "321 Oak Lane"
                },
                // Celestial Tennis Courts
                new Facility()
                {
                    // Id = 5,
                    Name = "Celestial Tennis Courts",
                    Sport = SportEnum.Tennis,
                    CountryCode = "UK",
                    PostCode = "24680",
                    City = "Reactville",
                    Address = "987 Pine Road"
                },
                // Aquatic Arena
                new Facility()
                {
                    // Id = 6,
                    Name = "Aquatic Arena",
                    Sport = SportEnum.Swimming,
                    CountryCode = "US",
                    PostCode = "97531",
                    City = "Reactville",
                    Address = "654 Maple Avenue"
                }
            };
            dbContext.Facilities.AddRange(facilities);
            dbContext.SaveChanges();
        }
        if (!dbContext.Items.Any())
        {
            var items = new[]
            {
                new Item()
                {
                    Id = 1,
                    Name = "Boxing Gloves",
                    Sport = SportEnum.CombatSports,
                    Price = 79.99,
                    //Quantity = 10
                },
                new Item()
                {
                    Id = 2,
                    Name = "Mouthguard",
                    Sport = SportEnum.CombatSports,
                    Price = 9.99,
                    //Quantity = 20
                },
                new Item()
                {
                    Id = 3,
                    Name = "Headgear",
                    Sport = SportEnum.CombatSports,
                    Price = 49.99,
                    //Quantity = 5
                },
                new Item()
                {
                    Id = 4,
                    Name = "Shin Guards",
                    Sport = SportEnum.CombatSports,
                    Price = 39.99,
                    //Quantity = 12
                },
                new Item()
                {
                    Id = 5,
                    Name = "MMA Shorts",
                    Sport = SportEnum.CombatSports,
                    Price = 29.99,
                    //Quantity = 15
                },
                // Soccer items
                new Item()
                {
                    Id = 6,
                    Name = "Soccer Ball",
                    Sport = SportEnum.Soccer,
                    Price = 24.99,
                    //Quantity = 20
                },
                new Item()
                {
                    Id = 7,
                    Name = "Soccer Shoes",
                    Sport = SportEnum.Soccer,
                    Price = 89.99,
                    //Quantity = 8
                },
                new Item()
                {
                    Id = 8,
                    Name = "Soccer Jersey",
                    Sport = SportEnum.Soccer,
                    Price = 49.99,
                    //Quantity = 12
                },
                new Item()
                {
                    Id = 9,
                    Name = "Soccer Goal",
                    Sport = SportEnum.Soccer,
                    Price = 149.99,
                    //Quantity = 5
                },
                new Item()
                {
                    Id = 10,
                    Name = "Soccer Training Cones",
                    Sport = SportEnum.Soccer,
                    Price = 9.99,
                    //Quantity = 30
                },
                // American Football items
                new Item()
                {
                    Id = 11,
                    Name = "Football - Wilson",
                    Sport = SportEnum.AmericanFootball,
                    Price = 29.99,
                    //Quantity = 15
                },
                new Item()
                {
                    Id = 12,
                    Name = "Football Helmet",
                    Sport = SportEnum.AmericanFootball,
                    Price = 159.99,
                    //Quantity = 8
                },
                new Item()
                {
                    Id = 13,
                    Name = "Football Gloves",
                    Sport = SportEnum.AmericanFootball,
                    Price = 39.99,
                    //Quantity = 20
                },
                new Item()
                {
                    Id = 14,
                    Name = "Football Shoulder Pads",
                    Sport = SportEnum.AmericanFootball,
                    Price = 89.99,
                    //Quantity = 12
                },
                new Item()
                {
                    Id = 15,
                    Name = "Football Cones",
                    Sport = SportEnum.AmericanFootball,
                    Price = 9.99,
                    //Quantity = 30
                },
                // Basketball items
                new Item()
                {
                    Id = 16,
                    Name = "Basketball - Spalding",
                    Sport = SportEnum.Basketball,
                    Price = 24.99,
                    //Quantity = 20
                },
                new Item()
                {
                    Id = 17,
                    Name = "Basketball Shoes",
                    Sport = SportEnum.Basketball,
                    Price = 99.99,
                    //Quantity = 8
                },
                new Item()
                {
                    Id = 18,
                    Name = "Basketball Jersey",
                    Sport = SportEnum.Basketball,
                    Price = 49.99,
                    //Quantity = 12
                },
                new Item()
                {
                    Id = 19,
                    Name = "Basketball Hoop",
                    Sport = SportEnum.Basketball,
                    Price = 199.99,
                    //Quantity = 5
                },
                new Item()
                {
                    Id = 20,
                    Name = "Basketball Training Cones",
                    Sport = SportEnum.Basketball,
                    Price = 9.99,
                    //Quantity = 30
                },
                // Tennis items
                new Item()
                {
                    Id = 21,
                    Name = "Tennis Racket - Wilson",
                    Sport = SportEnum.Tennis,
                    Price = 59.99,
                    //Quantity = 10
                },
                new Item()
                {
                    Id = 22,
                    Name = "Tennis Balls",
                    Sport = SportEnum.Tennis,
                    Price = 14.99,
                    //Quantity = 50
                },
                new Item()
                {
                    Id = 23,
                    Name = "Tennis Shoes",
                    Sport = SportEnum.Tennis,
                    Price = 79.99,
                    //Quantity = 8
                },
                new Item()
                {
                    Id = 24,
                    Name = "Tennis Bag",
                    Sport = SportEnum.Tennis,
                    Price = 39.99,
                    //Quantity = 15
                },
                new Item()
                {
                    Id = 25,
                    Name = "Tennis Training Cones",
                    Sport = SportEnum.Tennis,
                    Price = 9.99,
                    //Quantity = 30
                },
                // Swimming items
                new Item()
                {
                    Id = 26,
                    Name = "Swimming Goggles",
                    Sport = SportEnum.Swimming,
                    Price = 14.99,
                    //Quantity = 20
                },
                new Item()
                {
                    Id = 27,
                    Name = "Swimming Cap",
                    Sport = SportEnum.Swimming,
                    Price = 9.99,
                    //Quantity = 30
                },
                new Item()
                {
                    Id = 28,
                    Name = "Swimming Fins",
                    Sport = SportEnum.Swimming,
                    Price = 29.99,
                    //Quantity = 15
                },
                new Item()
                {
                    Id = 29,
                    Name = "Swimming Kickboard",
                    Sport = SportEnum.Swimming,
                    Price = 19.99,
                    //Quantity = 20
                },
                new Item()
                {
                    Id = 30,
                    Name = "Swimming Training Cones",
                    Sport = SportEnum.Swimming,
                    Price = 9.99,
                    //Quantity = 30
                }
            };
            dbContext.Items.AddRange(items);
            dbContext.SaveChanges();
        }
    }
}
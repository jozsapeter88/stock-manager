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
                    Name = "Boxing Gloves",
                    Price = 79.99,
                    SuggestedQuantity = 10
                },
                new Item()
                {
                    Name = "Mouthguard",
                    Price = 9.99,
                    SuggestedQuantity = 10
                },
                new Item()
                {
                    Name = "Headgear",
                    Price = 49.99,
                    SuggestedQuantity = 5
                },
                new Item()
                {
                    Name = "Shin Guards",
                    Price = 39.99,
                    SuggestedQuantity = 10
                },
                new Item()
                {
                    Name = "MMA Shorts",
                    Price = 29.99,
                    SuggestedQuantity = 15
                },
                // Soccer items
                new Item()
                {
                    Name = "Soccer Ball",
                    Price = 24.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "Soccer Shoes",
                    Price = 89.99,
                    SuggestedQuantity = 8
                },
                new Item()
                {
                    Name = "Soccer Jersey",
                    Price = 49.99,
                    SuggestedQuantity = 12
                },
                new Item()
                {
                    Name = "Soccer Goal",
                    Price = 149.99,
                    SuggestedQuantity = 5
                },
                new Item()
                {
                    Name = "Soccer Training Cones",
                    Price = 9.99,
                    SuggestedQuantity = 30
                },
                // American Football items
                new Item()
                {
                    Name = "Football - Wilson",
                    Price = 29.99,
                    SuggestedQuantity = 15
                },
                new Item()
                {
                    Name = "Football Helmet",
                    Price = 159.99,
                    SuggestedQuantity = 8
                },
                new Item()
                {
                    Name = "Football Gloves",
                    Price = 39.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "Football Shoulder Pads",
                    Price = 89.99,
                    SuggestedQuantity = 12
                },
                new Item()
                {
                    Name = "Football Cones",
                    Price = 9.99,
                    SuggestedQuantity = 30
                },
                // Basketball items
                new Item()
                {
                    Name = "Basketball - Spalding",
                    Price = 24.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "Basketball Shoes",
                    Price = 99.99,
                    SuggestedQuantity = 8
                },
                new Item()
                {
                    Name = "Basketball Jersey",
                    Price = 49.99,
                    SuggestedQuantity = 12
                },
                new Item()
                {
                    Name = "Basketball Hoop",
                    Price = 199.99,
                    SuggestedQuantity = 5
                },
                new Item()
                {
                    Name = "Basketball Training Cones",
                    Price = 9.99,
                    SuggestedQuantity = 30
                },
                // Tennis items
                new Item()
                {
                    Name = "Tennis Racket - Wilson",
                    Price = 59.99,
                    SuggestedQuantity = 10
                },
                new Item()
                {
                    Name = "Tennis Balls",
                    Price = 14.99,
                    SuggestedQuantity = 50
                },
                new Item()
                {
                    Name = "Tennis Shoes",
                    Price = 79.99,
                    SuggestedQuantity = 8
                },
                new Item()
                {
                    Name = "Tennis Bag",
                    Price = 39.99,
                    SuggestedQuantity = 15
                },
                new Item()
                {
                    Name = "Tennis Training Cones",
                    Price = 9.99,
                    SuggestedQuantity = 30
                },
                // Swimming items
                new Item()
                {
                    Name = "Swimming Goggles",
                    Price = 14.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "Swimming Cap",
                    Price = 9.99,
                    SuggestedQuantity = 30
                },
                new Item()
                {
                    Name = "Swimming Fins",
                    Price = 29.99,
                    SuggestedQuantity = 15
                },
                new Item()
                {
                    Name = "Swimming Kickboard",
                    Price = 19.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "Swimming Training Cones",
                    Price = 9.99,
                    SuggestedQuantity = 30
                }
            };
            dbContext.Items.AddRange(items);
            dbContext.SaveChanges();
        }
    }
}
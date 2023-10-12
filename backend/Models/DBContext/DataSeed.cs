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
                    Name = "Sport Arena",
                    Category = CategoryEnum.Sport,
                    CountryCode = "US",
                    PostCode = "12345",
                    City = "Reactville",
                    Address = "123 Main Street"
                },
                // Stormwatch Stadium
                new Facility()
                {
                    //Id = 2,
                    Name = "Clothing Store",
                    Category = CategoryEnum.Clothing,
                    CountryCode = "UK",
                    PostCode = "67890",
                    City = "Reactville",
                    Address = "456 High Street"
                },
                // Gridiron Grounds
                new Facility()
                {
                    // Id = 3,
                    Name = "Computer Store",
                    Category = CategoryEnum.Electronics,
                    CountryCode = "US",
                    PostCode = "54321",
                    City = "Reactville",
                    Address = "789 Elm Avenue"
                },
                // Mystic Court
                new Facility()
                {
                    // Id = 4,
                    Name = "Home Depot",
                    Category = CategoryEnum.Home,
                    CountryCode = "US",
                    PostCode = "13579",
                    City = "Reactville",
                    Address = "321 Oak Lane"
                },
                // Celestial Tennis Courts
                new Facility()
                {
                    // Id = 5,
                    Name = "Beauty Center",
                    Category = CategoryEnum.Beauty,
                    CountryCode = "UK",
                    PostCode = "24680",
                    City = "Reactville",
                    Address = "987 Pine Road"
                },
                // Aquatic Arena
                new Facility()
                {
                    // Id = 6,
                    Name = "Kid's Playground",
                    Category = CategoryEnum.Games,
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
               
                // Sport items
                new Item()
                {
                    Name = "Soccer Ball",
                    Category = CategoryEnum.Sport,
                    Price = 19.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "Basketball",
                    Category = CategoryEnum.Sport,
                    Price = 24.99,
                    SuggestedQuantity = 15
                },
                new Item()
                {
                    Name = "Tennis Racket",
                    Category = CategoryEnum.Sport,
                    Price = 59.99,
                    SuggestedQuantity = 10
                },
                new Item()
                {
                    Name = "Yoga Mat",
                    Category = CategoryEnum.Sport,
                    Price = 29.99,
                    SuggestedQuantity = 25
                },
                new Item()
                {
                    Name = "Dumbbell Set",
                    Category = CategoryEnum.Sport,
                    Price = 69.99,
                    SuggestedQuantity = 8
                },
                // Clothing items
                new Item()
                {
                    Name = "T-Shirt",
                    Category = CategoryEnum.Clothing,
                    Price = 19.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "Jeans",
                    Category = CategoryEnum.Clothing,
                    Price = 49.99,
                    SuggestedQuantity = 15
                },
                new Item()
                {
                    Name = "Dress",
                    Category = CategoryEnum.Clothing,
                    Price = 69.99,
                    SuggestedQuantity = 12
                },
                new Item()
                {
                    Name = "Sweater",
                    Category = CategoryEnum.Clothing,
                    Price = 39.99,
                    SuggestedQuantity = 18
                },
                new Item()
                {
                    Name = "Running Shoes",
                    Category = CategoryEnum.Clothing,
                    Price = 79.99,
                    SuggestedQuantity = 10
                },
                // Electronics items
                new Item()
                {
                    Name = "Smartphone",
                    Category = CategoryEnum.Electronics,
                    Price = 499.99,
                    SuggestedQuantity = 5
                },
                new Item()
                {
                    Name = "Laptop",
                    Category = CategoryEnum.Electronics,
                    Price = 799.99,
                    SuggestedQuantity = 8
                },
                new Item()
                {
                    Name = "Digital Camera",
                    Category = CategoryEnum.Electronics,
                    Price = 349.99,
                    SuggestedQuantity = 6
                },
                new Item()
                {
                    Name = "Bluetooth Speaker",
                    Category = CategoryEnum.Electronics,
                    Price = 89.99,
                    SuggestedQuantity = 15
                },
                new Item()
                {
                    Name = "Wireless Earbuds",
                    Category = CategoryEnum.Electronics,
                    Price = 69.99,
                    SuggestedQuantity = 12
                },
                // Home items
                new Item()
                {
                    Name = "Sofa",
                    Category = CategoryEnum.Home,
                    Price = 599.99,
                    SuggestedQuantity = 2
                },
                new Item()
                {
                    Name = "Garden Hose",
                    Category = CategoryEnum.Home,
                    Price = 29.99,
                    SuggestedQuantity = 10
                },
                new Item()
                {
                    Name = "Dining Table",
                    Category = CategoryEnum.Home,
                    Price = 299.99,
                    SuggestedQuantity = 4
                },
                new Item()
                {
                    Name = "Lawn Mower",
                    Category = CategoryEnum.Home,
                    Price = 149.99,
                    SuggestedQuantity = 6
                },
                new Item()
                {
                    Name = "Potted Plant",
                    Category = CategoryEnum.Home,
                    Price = 19.99,
                    SuggestedQuantity = 30
                },

                // Beauty items
                new Item()
                {
                    Name = "Lipstick",
                    Category = CategoryEnum.Beauty,
                    Price = 9.99,
                    SuggestedQuantity = 30
                },
                new Item()
                {
                    Name = "Shampoo",
                    Category = CategoryEnum.Beauty,
                    Price = 7.99,
                    SuggestedQuantity = 40
                },
                new Item()
                {
                    Name = "Perfume",
                    Category = CategoryEnum.Beauty,
                    Price = 29.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "Facial Cleanser",
                    Category = CategoryEnum.Beauty,
                    Price = 12.99,
                    SuggestedQuantity = 25
                },
                new Item()
                {
                    Name = "Mascara",
                    Category = CategoryEnum.Beauty,
                    Price = 6.99,
                    SuggestedQuantity = 35
                },

                // Game items
                new Item()
                {
                    Name = "Board Game",
                    Category = CategoryEnum.Games,
                    Price = 24.99,
                    SuggestedQuantity = 15
                },
                new Item()
                {
                    Name = "Video Game Console",
                    Category = CategoryEnum.Games,
                    Price = 299.99,
                    SuggestedQuantity = 5
                },
                new Item()
                {
                    Name = "Playing Cards",
                    Category = CategoryEnum.Games,
                    Price = 2.99,
                    SuggestedQuantity = 50
                },
                new Item()
                {
                    Name = "Puzzle Game",
                    Category = CategoryEnum.Games,
                    Price = 19.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "Role-Playing Game (RPG)",
                    Category = CategoryEnum.Games,
                    Price = 59.99,
                    SuggestedQuantity = 10
                },

                // Food items
                new Item()
                {
                    Name = "Apples",
                    Category = CategoryEnum.Food,
                    Price = 0.99,
                    SuggestedQuantity = 100
                },
                new Item()
                {
                    Name = "Pasta",
                    Category = CategoryEnum.Food,
                    Price = 2.99,
                    SuggestedQuantity = 50
                },
                new Item()
                {
                    Name = "Canned Soup",
                    Category = CategoryEnum.Food,
                    Price = 1.99,
                    SuggestedQuantity = 60
                },
                new Item()
                {
                    Name = "Rice",
                    Category = CategoryEnum.Food,
                    Price = 3.99,
                    SuggestedQuantity = 40
                },
                new Item()
                {
                    Name = "Chocolate Bars",
                    Category = CategoryEnum.Food,
                    Price = 1.49,
                    SuggestedQuantity = 80
                },
                // Beverage items
                new Item()
                {
                    Name = "Bottled Water",
                    Category = CategoryEnum.Beverages,
                    Price = 0.99,
                    SuggestedQuantity = 100
                },
                new Item()
                {
                    Name = "Coffee Beans",
                    Category = CategoryEnum.Beverages,
                    Price = 6.99,
                    SuggestedQuantity = 30
                },
                new Item()
                {
                    Name = "Soda (Cans)",
                    Category = CategoryEnum.Beverages,
                    Price = 0.79,
                    SuggestedQuantity = 120
                },
                new Item()
                {
                    Name = "Tea Bags",
                    Category = CategoryEnum.Beverages,
                    Price = 3.99,
                    SuggestedQuantity = 40
                },
                new Item()
                {
                    Name = "Energy Drink",
                    Category = CategoryEnum.Beverages,
                    Price = 2.49,
                    SuggestedQuantity = 60
                },
                // Healtcare items
                new Item()
                {
                    Name = "Pain Relievers",
                    Category = CategoryEnum.Healthcare,
                    Price = 7.99,
                    SuggestedQuantity = 25
                },
                new Item()
                {
                    Name = "Vitamins",
                    Category = CategoryEnum.Healthcare,
                    Price = 12.99,
                    SuggestedQuantity = 20
                },
                new Item()
                {
                    Name = "First Aid Kit",
                    Category = CategoryEnum.Healthcare,
                    Price = 19.99,
                    SuggestedQuantity = 10
                },
                new Item()
                {
                    Name = "Thermometer",
                    Category = CategoryEnum.Healthcare,
                    Price = 9.99,
                    SuggestedQuantity = 15
                },
                new Item()
                {
                    Name = "Allergy Medication",
                    Category = CategoryEnum.Healthcare,
                    Price = 5.99,
                    SuggestedQuantity = 30
                },
            };
            dbContext.Items.AddRange(items);
            dbContext.SaveChanges();
        }
    }
}
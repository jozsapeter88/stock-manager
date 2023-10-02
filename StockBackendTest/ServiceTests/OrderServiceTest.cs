using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StockBackend.Areas.Identity.Enums;
using StockBackend.Models;
using StockBackend.Models.DBContext;
using StockBackend.Models.DTO;
using StockBackend.Service;
using StockBackendTest.Fixtures;
using Xunit.Abstractions;

namespace StockBackendTest.ServiceTests;
[Collection("ServiceCollection")]
public class OrderServiceTest
{
    private readonly ServiceFixture _serviceFixture;
    private readonly ITestOutputHelper _testOutputHelper;

    public OrderServiceTest(ServiceFixture serviceFixture, ITestOutputHelper testOutputHelper)
    {
        _serviceFixture = serviceFixture;
        _testOutputHelper = testOutputHelper;
    }

   [Fact]

    public async Task AddOrder_ByUserWithoutOrders()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase($"StockDbForTesting{Guid.NewGuid()}")
            .Options;
        //Arrange
        var seed = await _serviceFixture.AddUserAndFacilityToInMemoryDb(options);

        //Act
        
        await using var context = new ApplicationDbContext(options);
        var orderService = new OrderService(context);
        var orderToAdd = new OrderDto()
        {
            Comment = "test_comment",
            Facility = seed.Item2,
            ItemQuantities = new List<ItemQuantityDto>
            {
                new ItemQuantityDto
                {
                    Item = new Item
                    {
                        Name = "testItem",
                        Sport = SportEnum.Basketball,
                        Price = 10.00
                    },
                    Quantity = 10
                },
                new ItemQuantityDto
                {
                    Item = new Item
                    {
                        Name = "testItem2",
                        Sport = SportEnum.Basketball,
                        Price = 12.00
                    },
                    Quantity = 20
                }
            }
        };
        await orderService.AddOrder(orderToAdd, "test-Id");
        var user =  await context.Users
            .Include(user => user.OrdersOfUser)!.ThenInclude(order => order.OrderItemQuantities)
            .ThenInclude(orderItemQuantity => orderItemQuantity.Item)
            .Include(user => user.OrdersOfUser)!.ThenInclude(order => order.Facility)
            .FirstOrDefaultAsync(u => u.UserName == "testUser");
        //Assert
        Assert.True(user?.OrdersOfUser?.First().OrderItemQuantities?.Count == 2);
        _testOutputHelper.WriteLine(user?.OrdersOfUser?.First().OrderItemQuantities.First().Item.Name);
        Assert.True(user?.OrdersOfUser?.First().Facility.Name == "TestFacility");
        Assert.Equal(10, user?.OrdersOfUser?.First().OrderItemQuantities.First().Quantity);
    }
}
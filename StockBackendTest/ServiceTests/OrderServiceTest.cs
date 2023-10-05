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
            FacilityId = seed.Item2.Id,
            ItemQuantities = new List<ItemQuantityDto>
            {
                new ItemQuantityDto
                {
                    ItemId = seed.Item3[0].Id,
                    Quantity = 10
                },
                new ItemQuantityDto
                {
                    ItemId = seed.Item3[1].Id,
                    Quantity = 20
                }
            }
        };
        await orderService.AddOrder(orderToAdd, "test-Id");
        var user =  await context.Users
            .Include(user => user.OrdersOfUser)!.ThenInclude(order => order.OrderItemQuantities)
            .ThenInclude(orderItemQuantity => orderItemQuantity.Item)
            .Include(user => user.OrdersOfUser)!.ThenInclude(order => order.Facility)
            .ThenInclude(facility => facility.Items)
            .FirstOrDefaultAsync(u => u.UserName == "testUser");
        //Assert
        Assert.True(user?.OrdersOfUser?.First().OrderItemQuantities?.Count == 2);
        _testOutputHelper.WriteLine(user?.OrdersOfUser?.First().OrderItemQuantities.First().Item.Name);
        Assert.True(user?.OrdersOfUser?.First().Facility.Name == "TestFacility");
        Assert.Equal(10, user?.OrdersOfUser?.First().OrderItemQuantities.First().Quantity);
        Assert.Equal(0, user?.OrdersOfUser?.First().Facility.Items.Count);
    }

    [Fact]
    public async Task ConfirmOrder_FacilityItemsCountEqualZero()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase($"StockDbForTesting{Guid.NewGuid()}")
            .Options;
        //Arrange 
        var seed = await _serviceFixture.AddUserAndFacilityToInMemoryDb(options);
        
        //Act
        await using var context = new ApplicationDbContext(options);
        var orderService = new OrderService(context);
        await orderService.ConfirmOrder(1);
        var facility = await context.Facilities
           .Include(facility => facility.Items)
           .FirstOrDefaultAsync(f => f.Id == 2);

        var order = await context.Orders.FirstOrDefaultAsync(o => o.Id == 1);
       //Assert
       Assert.NotNull(facility);
       Assert.NotNull(facility.Items);
       Assert.Single(facility.Items);
       Assert.True(order!.IsDelivered);
       Assert.Equal(15, facility.Items[0].Quantity);
    }

    [Fact]
    public async Task ConfirmOrder_FacilityItemsCountMoreThanZero()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase($"StockDbForTesting{Guid.NewGuid()}")
            .Options;
        //Arrange 
        var seed = await _serviceFixture.AddUserAndFacilityToInMemoryDb(options);
       
        //Act
        await using var context = new ApplicationDbContext(options);
        var orderService = new OrderService(context);
        await orderService.ConfirmOrder(2);
        var facility = await context.Facilities.Include(facility => facility.Items).FirstOrDefaultAsync(f => f.Id == 3);
        var order = await context.Orders.FirstOrDefaultAsync(o => o.Id == 2);
        //Assert
        Assert.NotNull(facility);
        Assert.NotNull(facility.Items);
        Assert.Single(facility.Items);
        Assert.True(order!.IsDelivered);
        Assert.Equal(30, facility.Items[0].Quantity);
    }
}
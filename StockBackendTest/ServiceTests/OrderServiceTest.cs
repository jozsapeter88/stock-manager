using Microsoft.EntityFrameworkCore;
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
            Quantity = 10,
            Comment = "test_comment",
            Facility = seed.Item2,
            Items = seed.Item3,
        };
        await orderService.AddOrder(orderToAdd, "test-Id");
        var user =  await context.Users
            .Include(user => user.OrdersOfUser)!.ThenInclude(order => order.Items)
            .Include(user => user.OrdersOfUser)!.ThenInclude(order => order.Facility)
            .FirstOrDefaultAsync(u => u.UserName == "testUser");
        //Assert
        Assert.True(user?.OrdersOfUser?.First().Items?.Count == 2);
        user?.OrdersOfUser?.First().Items.ForEach(f => _testOutputHelper.WriteLine(f.Name));
        Assert.True(user?.OrdersOfUser?.First().Facility.Name == "TestFacility");
        Assert.Equal(10, user?.OrdersOfUser?.First().Quantity);
    }
}
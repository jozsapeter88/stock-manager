using Microsoft.EntityFrameworkCore;
using StockBackend.Models.DBContext;
using StockBackend.Service;
using StockBackendTest.Fixtures;
using Xunit.Abstractions;

namespace StockBackendTest.ServiceTests;

[Collection("ServiceCollection")]
public class ItemServiceTest
{
    private readonly ServiceFixture _serviceFixture;
    
    public ItemServiceTest(ServiceFixture serviceFixture)
    {
        _serviceFixture = serviceFixture;
    }

    [Fact]
    public async Task GetItems_MustReturnListOfItems()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase($"StockDbForTesting{Guid.NewGuid()}")
            .Options;
        //Arrange
         await _serviceFixture.AddUserAndFacilityToInMemoryDb(options);
        
        //Act
        await using var context = new ApplicationDbContext(options);
        var itemService = new ItemService(context);
        var result = await itemService.GetItems();

        Assert.Equal(2, result!.Count);
    }
    
    [Fact]
    public async Task GetItems_MustReturnEmptyList()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase($"StockDbForTesting{Guid.NewGuid()}")
            .Options;
        //Arrange
        //Act
        await using var context = new ApplicationDbContext(options);
        var itemService = new ItemService(context);
        var result = await itemService.GetItems();

        Assert.Empty(result);
    }
}
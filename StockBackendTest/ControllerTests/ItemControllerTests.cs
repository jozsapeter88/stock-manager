using Microsoft.AspNetCore.Mvc;
using Moq;
using StockBackend.Areas.Identity.Enums;
using StockBackend.Controllers;
using StockBackend.Models;
using StockBackend.Service;

namespace StockBackendTest.ControllerTests;

public class ItemControllerTests
{
    private readonly ItemController _itemController;
    private readonly Mock<IItemService> _mockItemService;
    
    public ItemControllerTests()
    {
        _mockItemService = new Mock<IItemService>();
        _itemController = new ItemController(_mockItemService.Object);
    }

    [Fact]
    public async Task GetItems_MustReturnOkObjectResultWithCorrectAmountOfItems()
    {
        //Arrange
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
        _mockItemService
            .Setup(m => m.GetItems())
            .ReturnsAsync(itemsToAdd);
        
        //Act
        var result = await _itemController.GetItems();
        
        //Assert
        var actionResult = Assert.IsType<ActionResult<List<Item>>>(result);
        var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var itemList = Assert.IsAssignableFrom<List<Item>>(okObjectResult.Value);
        Assert.Equal(2, itemList.Count);
    }
    
    [Fact]
    public async Task GetItems_MustReturnNotFoundObjectResult()
    {
        //Arrange
        _mockItemService
            .Setup(m => m.GetItems())
            .ReturnsAsync((List<Item>?)null);
        
        //Act
        var result = await _itemController.GetItems();
        
        //Assert
        var actionResult = Assert.IsType<ActionResult<List<Item>>>(result);
        var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(actionResult.Result);
        Assert.Equal("No items available", notFoundObjectResult.Value);
    }
}
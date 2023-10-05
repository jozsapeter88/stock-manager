using Microsoft.AspNetCore.Mvc;
using Moq;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Areas.Identity.Enums;
using StockBackend.Controllers;
using StockBackend.Models;
using StockBackend.Models.DTO;
using StockBackend.Service;
using NotFoundObjectResult = Microsoft.AspNetCore.Mvc.NotFoundObjectResult;

namespace StockBackendTest.ControllerTests;

public class OrderControllerTests
{
    private readonly OrderController _orderController;
    private readonly Mock<IOrderService> _mockOrderService;
    private readonly Order _firstOrder;
    private readonly Facility _firstFacility;
    private readonly Item _secondItem;
    private readonly Item _thirdItem;

    public OrderControllerTests()
    {
        _mockOrderService = new Mock<IOrderService>();
        _orderController = new OrderController(_mockOrderService.Object);
        
        var firstUser = new User
        {
            Id = "test-Id",
            UserName = "testUser",
            Email = "testUser@example.com",
            Role = RoleEnum.User
        };
        
         _firstFacility = new Facility()
        {
            Id = 1,
            Name = "TestFacility",
            Sport = SportEnum.Soccer,
            CountryCode = "ExampleCode",
            PostCode = "ExamplePostCode",
            City = "TestCity",
            Address = "TestAddress",
            Users = new List<User>(){firstUser}
        };
        _firstOrder = new Order()
        {
            Id = 1,
            Comment = "testOrder_comment",
            CreatedAt = DateTime.UtcNow,
            Facility = _firstFacility,
            OrderItemQuantities = new List<OrderItemQuantity>()
                { 
                    new OrderItemQuantity()
                    { 
                        OrderId = 1,
                        Order = _firstOrder!,
                        ItemId = 1,
                        Item = new Item() 
                    { 
                        Id = 1, 
                        Name = "testItem1", 
                        Price = 10, 
                        Quantity = 2, 
                        Sport = SportEnum.Soccer 
                    }, 
                        Quantity  = 15// This is the quantity for the first item
                }
            },
            UserOfOrder = firstUser
        };

        _secondItem = new Item()
        {
            Id = 2,
            Name = "testItem2",
            Price = 20,
            Sport = SportEnum.Basketball
        };
        
       _thirdItem = new Item()
        {
            Id = 3,
            Name = "testItem3",
            Price = 30,
            Sport = SportEnum.Basketball
        };
    }

    [Fact]
    public async Task GetOrdersOfUser_GetAction_MustReturnOkObjectResultWithCorrectAmountOfOrders()
    {
        //Arrange
        _mockOrderService
            .Setup(m => m.GetOrdersOfUser(It.IsAny<string>()))!
            .ReturnsAsync(new List<Order>() { _firstOrder });
        
        //Act
        var result = await _orderController.GetOrdersOfUser("test-Id");
        
        //Assert
        var actionResult = Assert.IsType<ActionResult<List<Order>>>(result);
        var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var orderList = Assert.IsAssignableFrom<List<Order>>(okObjectResult.Value);
        Assert.Single(orderList);
    }
    
    [Fact]
    public async Task GetOrdersOfUser_GetAction_MustReturnNotFoundObjectResult()
    {
        //Arrange
        _mockOrderService
            .Setup(m => m.GetOrdersOfUser(It.IsAny<string>()))!
            .ReturnsAsync((List<Order>?)null);
        
        //Act
        var result = await _orderController.GetOrdersOfUser("test-Id");
        
        //Assert
        var actionResult = Assert.IsType<ActionResult<List<Order>>>(result);
        var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(actionResult.Result);
        Assert.Equal("No orders for the User", notFoundObjectResult.Value);
    }

    [Fact]
    public async Task AddOrder_PostAction_MustReturnOkObjectResultWithTheAddedOrder()
    {
        //Arrange
        _mockOrderService
            .Setup(m => m.AddOrder(It.IsAny<OrderDto>(), It.IsAny<string>()))
            .ReturnsAsync(_firstOrder);
        
        //Act
        var orderDto = new OrderDto()
        {

            Comment = "testOrder_comment",
            FacilityId = _firstFacility.Id,
            ItemQuantities = new List<ItemQuantityDto>
            {
                new ItemQuantityDto
                {
                    ItemId = _secondItem.Id,
                    Quantity = 10
                },
                new ItemQuantityDto
                {
                    ItemId = _thirdItem.Id,
                    Quantity = 20
                }
            }
        };
        var result = await _orderController
            .AddOrder(orderDto, "test-Id");
        
        //Arrange
        var actionResult = Assert.IsType<ActionResult<Order>>(result);
        var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var order = Assert.IsAssignableFrom<Order>(okObjectResult.Value);
        Assert.Equal(1, order.Id);
    }
    
    [Fact]
    public async Task AddOrder_PostAction_MustReturnNotFoundObjectResult()
    {
        //Arrange
        _mockOrderService
            .Setup(m => m.AddOrder(It.IsAny<OrderDto>(), It.IsAny<string>()))
            .ReturnsAsync((Order?)null);
        
        //Act
        var orderDto = new OrderDto(){
       
            Comment = "testOrder_comment", 
            FacilityId = _firstFacility.Id,
            ItemQuantities = new System.Collections.Generic.List<ItemQuantityDto>
            {
                new ItemQuantityDto
                {
                    ItemId= _secondItem.Id,
                    Quantity = 10
                }
            }
        };
        var result = await _orderController
            .AddOrder(orderDto, "test-Id");
        
        //Arrange
        var actionResult = Assert.IsType<ActionResult<Order>>(result);
        var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(actionResult.Result);
        Assert.Equal("User is not found!", notFoundObjectResult.Value);
    }
}
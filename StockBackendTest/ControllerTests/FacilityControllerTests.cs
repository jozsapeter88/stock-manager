using Microsoft.AspNetCore.Mvc;
using Moq;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Areas.Identity.Enums;
using StockBackend.Controllers;
using StockBackend.Models;
using StockBackend.Service;

namespace StockBackendTest.ControllerTests;

public class FacilityControllerTests
{
    private readonly FacilityController _facilityController;
    private readonly Mock<IFacilityService> _mockFacilityService;
    private readonly Facility _firstFacility;
    private readonly Facility _secondFacility;

    public FacilityControllerTests()
    {
        var firstUser = new User
        {
            Id = "test-Id",
            UserName = "testUser",
            Email = "testUser@example.com",
            Role = RoleEnum.User
        };
        
        var secondUser = new User
        {
            Id = "test-Id2",
            UserName = "testUser2",
            Email = "testUse2r@example.com",
            Role = RoleEnum.User
        };

        _firstFacility = new Facility()
        {
            Id = 1,
            Name = "TestFacility",
            Category = CategoryEnum.Sport,
            CountryCode = "ExampleCode",
            PostCode = "ExamplePostCode",
            City = "TestCity",
            Address = "TestAddress",
            Users = new List<User>(){firstUser, secondUser}
        };
        _secondFacility = new Facility()
        {
            Id = 2,
            Name = "Celestial Tennis Courts",
            Category = CategoryEnum.Sport,
            CountryCode = "UK",
            PostCode = "24680",
            City = "Reactville",
            Address = "987 Pine Road",
            Users = new List<User>(){firstUser}
        };
        _mockFacilityService = new Mock<IFacilityService>();
        _facilityController = new FacilityController(_mockFacilityService.Object);
    }

    [Fact]
    public async Task GetAllFacilities_GetAction_MustReturnOkObjectResultWithCorrectAmountOfFacilities()
    {
        //Arrange
        _mockFacilityService
            .Setup(m => m.GetAllFacility())
            .ReturnsAsync(new List<Facility>(){_firstFacility,_secondFacility});
        //Act
        var result = await _facilityController.GetAll();
        
        //Assert
        var actionResult = Assert.IsType<ActionResult<List<Facility>>>(result);
        var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var fList = Assert.IsAssignableFrom<List<Facility>>(okObjectResult.Value);
        Assert.Equal(2, fList.Count);
    }

    [Fact]
    public async Task GetFacilitiesOfUser_GetAction_MustReturnOkObjectResultWithCorrectAmountOfFacilities()
    {
        //Arrange
        _mockFacilityService
            .Setup(m => m.GetFacilitiesOfUser(It.IsAny<string>()))
            .ReturnsAsync(new List<Facility>() {_firstFacility });
        //Act
        var result = await _facilityController.GetFacilitiesOfUser("test-id");
        
        //Assert
        var actionResult = Assert.IsType<ActionResult<List<Facility>>>(result);
        var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var fList = Assert.IsAssignableFrom<List<Facility>>(okObjectResult.Value);
        Assert.Single(fList);
    }

    [Fact]
    public async Task GetFacilitiesOfUser_GetAction_MustReturnNotFoundObjectResult()
    {
        //Arrange
        _mockFacilityService
            .Setup(m => m.GetFacilitiesOfUser(It.IsAny<string>()))
            .ReturnsAsync((List<Facility>?)null);
        //Act
        var result = await _facilityController.GetFacilitiesOfUser("test-id");
        
        //Assert
        var actionResult = Assert.IsType<ActionResult<List<Facility>>>(result);
        var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(actionResult.Result);
        Assert.Equal("User doesn't have facilities", notFoundObjectResult.Value);
    }
    
    [Fact]
    public async Task AddFacilityToUser_PostAction_MustReturnOkObjectResultWithAddedFacility()
    {
        //Assert
        _mockFacilityService
            .Setup(m => m.AddFacilityToUser(It.IsAny<int>(), It.IsAny<string>()))
            .ReturnsAsync(_firstFacility);
        
        //Act
        var result = await _facilityController.AddFacilityToUser("test-Id", 1);
        
        //Assert
        var actionResult = Assert.IsType<ActionResult<Facility>>(result);
        var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var facility = Assert.IsAssignableFrom<Facility>(okObjectResult.Value);
        Assert.Equal(1, facility.Id);
    }
}
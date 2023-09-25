using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Controllers;
using StockBackend.Service;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace StockBackendTest.ControllerTests;

public class UserControllerTests
{
    private readonly UserController _userController;
    private readonly Mock<IUserService> _mockUserService;

    public UserControllerTests()
    {
        _mockUserService = new Mock<IUserService>();
        _userController = new UserController(_mockUserService.Object);
    }

    [Fact]
    public async Task RegisterUser_InvalidInput_MustReturnBadRequest()
    {
        //Arrange
        var registerModel = new RegisterModel();
        _userController.ModelState.AddModelError("UserName", "Required");
        
        //Act
        var result = await _userController.Register(registerModel);
        
        //Assert
        var actionResult = Assert.IsAssignableFrom<ActionResult>(result);
        var badRequest = Assert.IsType<BadRequestObjectResult>(actionResult);
        Assert.IsType<SerializableError>(badRequest.Value);
    }

    [Fact]
    public async Task RegisterUser_ValidInput_MustReturnOkObjectResult()
    {
        //Arrange
        _mockUserService
            .Setup(m => m.RegisterUserAsync(It.IsAny<User>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Success);
        
        //Act
        var result = await _userController.Register(new RegisterModel());
        
        //Assert
        var actionResult = Assert.IsAssignableFrom<ActionResult>(result);
        Assert.IsType<OkResult>(actionResult);
    }

    [Fact]
    public async Task LoginUser_InvalidInput_MustReturnBadRequest()
    {
        //Arrange
        var loginModel = new LoginModel();
        _userController.ModelState.AddModelError("Password", "Required");
        
        //Act
        var result = await _userController.Login(loginModel);
        
        //Assert
        var actionResult = Assert.IsAssignableFrom<ActionResult>(result);
        var badRequest = Assert.IsType<BadRequestObjectResult>(actionResult);
        Assert.IsType<SerializableError>(badRequest.Value);
    }
    
    [Fact]
    public async Task LoginUser_ValidInput_MustReturnOkObjectResult()
    {
        //Arrange
        _mockUserService
            .Setup(m => m.SignInAsync(It.IsAny<string>(),
                It.IsAny<string>(), It.IsAny<bool>()))
            .ReturnsAsync(SignInResult.Success);
        
        //Act
        var result = await _userController.Login(new LoginModel());
        
        //Assert
        var actionResult = Assert.IsAssignableFrom<ActionResult>(result);
        Assert.IsType<OkObjectResult>(actionResult);
    }
    
    [Fact]
    public async Task LoginUser_WrongCredentials_MustReturnOkObjectResult()
    {
        //Arrange
        _mockUserService
            .Setup(m => m.SignInAsync(It.IsAny<string>(),
                It.IsAny<string>(), It.IsAny<bool>()))
            .ReturnsAsync(SignInResult.Failed);
        
        //Act
        var result = await _userController.Login(new LoginModel());
        
        //Assert
        var actionResult = Assert.IsAssignableFrom<ActionResult>(result);
        var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
        Assert.Equal("Login failed.", badRequestObjectResult.Value);
    }
}
using Microsoft.AspNetCore.Mvc;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Areas.Identity.Enums;
using StockBackend.Service;

namespace StockBackend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class UserController: Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody]RegisterModel model)
    {
        Console.WriteLine(model.UserName);
        if (ModelState.IsValid)
        {
            var user = new User { UserName = model.UserName, Email = model.Email, Role = RoleEnum.User};
            var result = await _userService.RegisterUserAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result.Errors);
        }
        return BadRequest(ModelState);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]LoginModel model)
    {
        if (ModelState.IsValid)
        {
            var result = await _userService.SignInAsync(model.UserName, model.Password, model.RememberMe);
            
            if (result.Succeeded)
            {
                var user = await _userService.GetUserByName(model.UserName);
               
                Console.WriteLine(user.UserName);
                Console.WriteLine("role: " + user.Role);
                Console.WriteLine(model.RememberMe);
                return Ok(user);

            }

            return BadRequest("Login failed.");
        }

        return BadRequest(ModelState);
    }

}
using Microsoft.AspNetCore.Mvc;
using StockBackend.Areas.Identity.Data.Models;
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
    public async Task<IActionResult> Register(RegisterModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new User { UserName = model.UserName, Email = model.Email };
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
    public async Task<IActionResult> Login(LoginModel model)
    {
        if (ModelState.IsValid)
        {
            var result = await _userService.SignInAsync(model.UserName, model.Password, model.RememberMe);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest("Login failed.");
        }

        return BadRequest(ModelState);
    }

}
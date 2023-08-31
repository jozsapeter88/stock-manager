using Microsoft.AspNetCore.Identity;
using StockBackend.Areas.Identity.Data.Models;

namespace StockBackend.Service;

public class UserService: IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public UserService(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }
    public async Task<IdentityResult> RegisterUserAsync(User user, string password)
    {
       return await _userManager.CreateAsync(user, password);
    }

    public async Task<SignInResult> SignInAsync(string userName, string password, bool rememberMe)
    {
      return await _signInManager.PasswordSignInAsync(userName, password, rememberMe, lockoutOnFailure: false);
    }
}
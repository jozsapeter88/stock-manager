using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Models.DBContext;

namespace StockBackend.Service;

public class UserService: IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ApplicationDbContext _dbContext;

    public UserService(UserManager<User> userManager, SignInManager<User> signInManager, ApplicationDbContext dbContext)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _dbContext = dbContext;
    }
    public async Task<IdentityResult> RegisterUserAsync(User user, string password)
    {
       return await _userManager.CreateAsync(user, password);
    }

    public async Task<SignInResult> SignInAsync(string userName, string password, bool rememberMe)
    {
        Console.WriteLine("userserv:"+ userName);
      return await _signInManager.PasswordSignInAsync(userName, password, rememberMe, lockoutOnFailure: false);
    }

    public async Task<User?> GetUserByName(string userName)
    {
        var user =  await _userManager.FindByNameAsync(userName);

        return user ?? null;
    }

    public async Task<List<User>?> GetAllUsers()
    {
        var users = await _dbContext.Users.ToListAsync();
        return users ?? null;
    }
}
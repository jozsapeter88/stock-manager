using Microsoft.AspNetCore.Identity;
using StockBackend.Areas.Identity.Data.Models;

namespace StockBackend.Service;

public interface IUserService
{
    Task<IdentityResult> RegisterUserAsync(User user, string password);
    Task<SignInResult> SignInAsync(string userName, string password, bool rememberMe);
    Task<User?> GetUserByName(string userName);
}
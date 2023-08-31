using Microsoft.AspNetCore.Identity;
using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Areas.Identity.Data.Models;

public class Role: IdentityRole
{
    public RoleEnum RoleEnum { get; set; }
}
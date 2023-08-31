using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Areas.Identity.Data.Models;

public class User: IdentityUser
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long UserId { get; set; }

    public Role Role = new Role()
    {
        RoleEnum = RoleEnum.User
    };
}
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using StockBackend.Areas.Identity.Enums;

namespace StockBackend.Areas.Identity.Data.Models;

public class User : IdentityUser
{
    
    public RoleEnum Role { get; set; }
    public List<Facility>? FacilitiesOfUser { get; set; } 
}
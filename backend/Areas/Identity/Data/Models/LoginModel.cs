using System.ComponentModel.DataAnnotations;

namespace StockBackend.Areas.Identity.Data.Models;

public class LoginModel
{
    [Required]
    public string UserName { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Display(Name = "Remember me")]
    public bool RememberMe { get; set; }
}
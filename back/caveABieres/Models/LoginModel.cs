using System.ComponentModel.DataAnnotations;

namespace caveABieres.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email field is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password field is required")]
        public string? Password { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CaveABiere.Model;


public class RegisterModel
{
    [Required]
    public string? Username { get; set; }

    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }

    [Required]

    public string Lastname { get; set; }

    [Required]

    public string Firstname { get; set; }


    [JsonConstructor]
    public RegisterModel(string? username, string email, string password, string lastname, string firstname)
    {
        Username = username;
        Email = email;
        Password = password;
        Lastname = lastname;
        Firstname = firstname;
    }
}
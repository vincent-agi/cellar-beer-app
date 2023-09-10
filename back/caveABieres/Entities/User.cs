using Microsoft.AspNetCore.Identity;

namespace caveABieres.Entities
{
    public class User: IdentityUser
    {
        public List<Drink> Drinks { get; set; } = new List<Drink>();
        public string Lastname { get; set; }
        public string Firstname { get; set; }
    }
}

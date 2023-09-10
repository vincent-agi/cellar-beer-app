using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace caveABieres.Entities
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public override DbSet<User> Users { get; set; }
        public DbSet<Drink> Drinks { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}

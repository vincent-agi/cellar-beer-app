using caveABieres.Entities;
using Microsoft.AspNetCore.Identity;

namespace caveABieres.Configurations
{
    public static class IdentityConfiguration
    {
        public static void ConfigureIdentityUser(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Password.RequiredLength = 1;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;

                options.User.RequireUniqueEmail = true;
            }).AddDefaultTokenProviders()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();
        }
    }
}

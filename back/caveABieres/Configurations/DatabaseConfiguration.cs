using caveABieres.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace caveABieres.Configurations
{
    public static class DatabaseConfiguration
    {
        public static void ConfigurePostgresql(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            var connectionString = configuration.GetConnectionString("caveabiere");
            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
        }
    }
}

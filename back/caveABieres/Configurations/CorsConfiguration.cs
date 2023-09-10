using System.Runtime.CompilerServices;

namespace caveABieres.Configurations
{
    public static class CorsConfiguration
    {
        public static void AddCorsConfiguration(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());
            });
        }
    }
}

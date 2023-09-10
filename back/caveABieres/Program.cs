using caveABieres.Configurations;
using caveABieres.Entities;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
var configuration = builder.Configuration;
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
JwtConfiguration.AddConfigureJwt(builder.Services);
CorsConfiguration.AddCorsConfiguration(builder.Services);
builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("caveabiere")));
DatabaseConfiguration.ConfigurePostgresql(builder.Services, configuration);
IdentityConfiguration.ConfigureIdentityUser(builder.Services);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var actions = scope.ServiceProvider;

    var context = actions.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

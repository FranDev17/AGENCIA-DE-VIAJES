using db_back.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddDbContext<WebContext>(options =>
{
    options.UseNpgsql("Host=dpg-d1dl9eur433s73fhan20-a.oregon-postgres.render.com;Port=5432;Username=userdb_dwi7_user;Password=Vej9XS7Z92f9JXrYZbIeEWhI6vDL7UbV;Database=userdb_dwi7;SSL Mode=Require;Trust Server Certificate=true;");
});

builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowReactApp"); // Use the CORS policy defined above

app.UseAuthorization();

app.MapControllers(); // Map controllers to handle API requests

app.MapRazorPages();

app.Run();

using db_back.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddDbContext<WebContext>(options =>
{
    options.UseSqlServer("Server=YAKULT\\SQLEXPRESS;Database=UserDB;Trusted_Connection=True;TrustServerCertificate=True;");
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

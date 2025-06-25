using Microsoft.EntityFrameworkCore;

namespace db_back.Models
{
    public class WebContext : DbContext
    {
        public DbSet<User> Users { get; set; }// DbSet for User model

        public WebContext(DbContextOptions options) : base(options)
        {
        }
    }
}

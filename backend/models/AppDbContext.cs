using Microsoft.EntityFrameworkCore;
using url_shorter_backend.models.urls;
using url_shorter_backend.models.users;

namespace url_shorter_backend.models;

public class AppDbContext : DbContext
{
    public DbSet<UserDB> Users { get; set; }
    public DbSet<UrlDB> Urls { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        //Database.EnsureDeleted();
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UrlDB>(entity =>
        {
            entity.HasIndex(e => e.UrlShort)
                  .IsUnique()
                  .HasFilter(null)
                  .HasDatabaseName("_ShortUrl_Code");
        });

    }

}

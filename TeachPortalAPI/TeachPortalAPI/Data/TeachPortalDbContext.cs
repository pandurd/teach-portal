using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TeachPortalAPI.Models;

namespace TeachPortalAPI.Data
{
    public class TeachPortalDbContext : IdentityDbContext<AppUser>
    {
        public TeachPortalDbContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Student>(x => x.HasKey(p => new { p.Id, p.TeacherUserId }));

            builder.Entity<Student>()
            .HasOne(u => u.Teacher)
            .WithMany(u => u.Students)
            .HasForeignKey(p => p.TeacherUserId);

            List<IdentityRole> roles = new List<IdentityRole>
            {   
                //Could have admin role
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
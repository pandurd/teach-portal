using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace TeachPortalAPI.Models
{
    public class Teacher
    {
        [Key]
        public Guid Id { get; set; }

        public string UserName { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public List<Student> Students { get; set; } = new List<Student>();
    }
}

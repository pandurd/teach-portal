using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeachPortalAPI.Models
{
    public class Student
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("Id")]
        public Guid TeacherUserId { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public Teacher Teacher { get; set; }
    }
}
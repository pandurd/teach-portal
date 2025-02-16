using System.ComponentModel.DataAnnotations;

namespace TeachPortalAPI.Models.Admin
{
    public class AddStudentRequest
    {
        [Required]
        [StringLength(10, MinimumLength = 2, ErrorMessage = "First Name should be of length 2 to 10.")]
        [RegularExpression(@"^[A-Za-z ]*$", ErrorMessage = "Invalid First Name.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 2, ErrorMessage = "Last Name should be of length 2 to 10.")]
        [RegularExpression(@"^[A-Za-z ]*$", ErrorMessage = "Invalid Last Name.")]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}

namespace TeachPortalAPI.Models.Response
{
    public record TeacherWithStudentCount(string FirstName, string LastName, string Email, int StudentCount);
}

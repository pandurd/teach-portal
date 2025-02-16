using TeachPortalAPI.Extensions;
using TeachPortalAPI.Models;
using TeachPortalAPI.Models.Admin;

namespace TeachPortalAPI.Repositories
{
    public interface IStudentRepository
    {
        public Task<Student> AddStudent(Student student);
        public Task<List<Student>> GetStudents(AppUser teacher,PaginationRequest request);
    }
}

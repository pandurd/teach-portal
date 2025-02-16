using TeachPortalAPI.Extensions;
using TeachPortalAPI.Models;
using TeachPortalAPI.Models.Admin;
using TeachPortalAPI.Models.Response;

namespace TeachPortalAPI.Repositories
{
    public interface ITeacherRepository
    {
        public Task<Teacher> AddTeacher(Teacher teacher);

        Task<Teacher> FindTeacherByUserName(string userName);
        public Task<PaginatedList<TeacherWithStudentCount>> GetTeachers(PaginationRequest request);
    }
}

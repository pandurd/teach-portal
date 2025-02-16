
using Microsoft.EntityFrameworkCore;
using TeachPortalAPI.Data;
using TeachPortalAPI.Extensions;
using TeachPortalAPI.Models;
using TeachPortalAPI.Models.Admin;
using TeachPortalAPI.Models.Response;

namespace TeachPortalAPI.Repositories
{
    public class TeacherRepository : ITeacherRepository
    {
        private TeachPortalDbContext _teachPortalDbContext;

        public TeacherRepository(TeachPortalDbContext teachPortalDBContext)
        {
            _teachPortalDbContext = teachPortalDBContext;
        }

        public async Task<Teacher> AddTeacher(Teacher teacher)
        {
            await _teachPortalDbContext.Teachers.AddAsync(teacher);
            await _teachPortalDbContext.SaveChangesAsync();
            return teacher;
        }

        public async Task<Teacher?> FindTeacherByUserName(string userName)
        {
            var teacher = await _teachPortalDbContext.Teachers
                .FirstOrDefaultAsync(x => x.UserName.ToLower() == userName.ToLower());

            if (teacher == null)
                throw new Exception("Teacher not found.");


            return teacher;
        }

        public async Task<PaginatedList<TeacherWithStudentCount>> GetTeachers(PaginationRequest request)
        {
            var teachersWithStudentCount = from teacher in _teachPortalDbContext.Teachers
                        join student in _teachPortalDbContext.Students 
                            on teacher.Id equals student.TeacherUserId into joinedTables
                        select new TeacherWithStudentCount(teacher.FirstName, teacher.LastName, teacher.Email ,joinedTables.Count());

            //if (!string.IsNullOrWhiteSpace(request.SortBy))
            //{
            //    if (request.SortBy.Equals("FirstName", StringComparison.OrdinalIgnoreCase))
            //    {
            //        teacherWithStudentCount = request.IsDecsending 
            //            ? teacherWithStudentCount.OrderByDescending(s => s.FirstName) 
            //            : teacherWithStudentCount.OrderBy(s => s.FirstName);
            //    }

            //    if (request.SortBy.Equals("LastName", StringComparison.OrdinalIgnoreCase))
            //    {
            //        teacherWithStudentCount = request.IsDecsending 
            //            ? teacherWithStudentCount.OrderByDescending(s => s.LastName) 
            //            : teacherWithStudentCount.OrderBy(s => s.LastName);
            //    }
            //}

            var paginatedList = await PaginatedList<TeacherWithStudentCount>.CreateAsync(teachersWithStudentCount.ToList(), request.PageNumber, request.PageSize);
            return paginatedList;
        }
    }
}

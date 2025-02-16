
using Microsoft.EntityFrameworkCore;
using TeachPortalAPI.Data;
using TeachPortalAPI.Extensions;
using TeachPortalAPI.Models;
using TeachPortalAPI.Models.Admin;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace TeachPortalAPI.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private TeachPortalDbContext _teachPortalDbContext;

        public StudentRepository(TeachPortalDbContext teachPortalDbContext) 
        {
            _teachPortalDbContext = teachPortalDbContext;
        }

        public async Task<Student> AddStudent(Student student)
        {
            await _teachPortalDbContext.Students.AddAsync(student);
            await _teachPortalDbContext.SaveChangesAsync();
            return student;
        }

        public async Task<List<Student>> GetStudents(AppUser user, PaginationRequest request)
        {
            var students = _teachPortalDbContext.Students
                .AsNoTracking()
                .ToList();
            return students;
        }
    }
}

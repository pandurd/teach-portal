using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TeachPortalAPI.Models;
using TeachPortalAPI.Models.Admin;
using TeachPortalAPI.Models.Response;
using TeachPortalAPI.Repositories;

namespace TeachPortalAPI.Controllers
{
    [Route("api/teacher")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private ITeacherRepository _teacherRepository;

        public TeacherController(UserManager<AppUser> userManager,
            ITeacherRepository teacherRepository)
        {
            _userManager = userManager;
            _teacherRepository = teacherRepository;
        }

        [HttpGet]
        [Authorize]
        [Route("all")]
        public async Task<IActionResult> GetTeachers([FromQuery] PaginationRequest request)
        {
            var teachers = await _teacherRepository.GetTeachers(request);
            var response = new PaginatedResponse<TeacherWithStudentCount>
            {
                Items = teachers,
                PageIndex = teachers.PageIndex,
                TotalPages = teachers.TotalPages,
                HasPreviousPage = teachers.HasPreviousPage,
                HasNextPage = teachers.HasNextPage
            };

            return Ok(response);
        }

    }
}

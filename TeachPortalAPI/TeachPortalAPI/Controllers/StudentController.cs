using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json.Linq;
using System.Threading;
using TeachPortalAPI.Extensions;
using TeachPortalAPI.Models;
using TeachPortalAPI.Models.Admin;
using TeachPortalAPI.Models.Response;
using TeachPortalAPI.Repositories;

namespace TeachPortalAPI.Controllers
{
    [Route("api/student")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private static readonly SemaphoreSlim semaphore = new(1, 1);
        private IStudentRepository _studentRepository;
        private ITeacherRepository _teacherRepository;
        private IDistributedCache _cache;
        private ILogger<StudentController> _logger;
        private static readonly DistributedCacheEntryOptions cacheEntryOptions = new DistributedCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromSeconds(60))
            .SetAbsoluteExpiration(TimeSpan.FromSeconds(3600));

        public StudentController(UserManager<AppUser> userManager, 
            IStudentRepository studentRepository,
            ITeacherRepository teacherRepository,
            IDistributedCache cache,
            ILogger<StudentController> logger)
        {
            _userManager = userManager;
            _studentRepository = studentRepository;
            _teacherRepository = teacherRepository;
            _cache = cache;
            _logger = logger;
        }

        [HttpGet]
        [Authorize]
        [Route("all")]
        public async Task<IActionResult> GetStudents([FromQuery] PaginationRequest request)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var studentListCacheKey = GetCacheKey(appUser.UserName, request);

            if (_cache.TryGetValue(studentListCacheKey, out List<Student>? students))
            {
                _logger.Log(LogLevel.Information, "Student list found in cache.");
            }
            else
            {
                try
                {
                    await semaphore.WaitAsync();
                    if (_cache.TryGetValue(studentListCacheKey, out students))
                    {
                        _logger.Log(LogLevel.Information, "Student list found in cache.");
                    }
                    else
                    {
                        _logger.Log(LogLevel.Information, "Student list not found in cache. Fetching from database.");
                        
                        students = await _studentRepository.GetStudents(appUser, request);
                        await _cache.SetAsync(studentListCacheKey, students, cacheEntryOptions);  
                    }
                }
                finally
                {
                    semaphore.Release();
                }
            }

            var paginatedStudentList = await PaginatedList<Student>.CreateAsync(students, request.PageNumber, request.PageSize);
            var response = new PaginatedResponse<Student>
            {
                Items = paginatedStudentList,
                PageIndex = paginatedStudentList.PageIndex,
                TotalPages = paginatedStudentList.TotalPages,
                HasPreviousPage = paginatedStudentList.HasPreviousPage,
                HasNextPage = paginatedStudentList.HasNextPage
            };

            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddStudent(AddStudentRequest studentRequest)
        {
            if(!ModelState.IsValid)
            {
                _logger.Log(LogLevel.Error, $"AddStudentRequest is invalid {studentRequest}");
                return BadRequest("Please provide valid Student details.");
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var teacher = await _teacherRepository.FindTeacherByUserName(username);

            var student = new Student()
            {
                Id = Guid.NewGuid(),
                FirstName = studentRequest.FirstName,
                LastName = studentRequest.LastName,
                Email = studentRequest.Email,
                TeacherUserId = teacher.Id,
                Teacher = teacher
            };

            await _studentRepository.AddStudent(student);

            //invalidate cache
            var cacheKey = GetCacheKey(username);
            await _cache.RemoveAsync(cacheKey);

            return Ok(student);
        }

        private string GetCacheKey(string userName, PaginationRequest request = null)
        {
            return userName;

            //Should be more optimized for pages and sorting for larger data set
            return $"{userName}_{request.PageNumber}_{request.PageSize}";
        }

    }
}

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeachPortalAPI.Models;
using TeachPortalAPI.Models.Account;
using TeachPortalAPI.Repositories;
using TeachPortalAPI.Services;

namespace TeachPortalAPI.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signinManager;
        private readonly ITeacherRepository _teacherRepository;

        public AccountController(UserManager<AppUser> userManager,
            ITokenService tokenService, 
            SignInManager<AppUser> signInManager,
            ITeacherRepository teacherRepository)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
            _teacherRepository = teacherRepository;
        }

        //Could be Azure AD b2c or Azure Entra ID External as security and maintenance is better than asp.net identity 
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginRequest.Username.ToLower());

            if (user == null) return Unauthorized("Please enter valid password.");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);

            if (!result.Succeeded) return Unauthorized("Please enter valid credentials.");

            return Ok(
                new AuthenticatedUser
                {
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] NewUser newUser)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    UserName = newUser.Username,
                    //Email = newUser.Email,
                };

                var createdUser = await _userManager.CreateAsync(appUser, newUser.Password);

                var teacher = new Teacher
                {
                    Id = Guid.NewGuid(),
                    UserName = appUser.UserName,
                    Email = newUser.Email,
                    FirstName = newUser.FirstName,
                    LastName = newUser.LastName
                };

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        //Add teacher for current user
                        await _teacherRepository.AddTeacher(teacher);

                        return Ok(
                            new AuthenticatedUser
                            {
                                UserName = appUser.UserName,
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
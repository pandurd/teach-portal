using TeachPortalAPI.Models;

namespace TeachPortalAPI.Services
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
using c.Services;
using caveABiere.Services;
using caveABieres.Entities;
using Microsoft.AspNetCore.Identity;

namespace fcs_backend.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;

    private readonly IHttpContextAccessor _accessor;
    public UserService(UserManager<User> userManager, IHttpContextAccessor accessor)
    {
        _userManager = userManager;
        _accessor = accessor;
    }

    async Task<User>? IUserService.GetCurrentUser()
    {
        string email = string.Empty;
        var userContext = (User)_accessor?.HttpContext?.Items["User"];
        if (userContext != null)
            email = userContext.Email;
        var user = await _userManager.FindByEmailAsync(email);
        return user;
    }
}
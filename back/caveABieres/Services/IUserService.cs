using caveABieres.Entities;

namespace caveABiere.Services;

public interface IUserService
{
    Task<User>? GetCurrentUser();
}
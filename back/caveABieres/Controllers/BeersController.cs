using caveABiere.Services;
using caveABieres.Entities;
using caveABieres.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace caveABieres.Controllers
{
    [Route("api/[controller")]
    [Authorize]
    public class BeersController : Controller
    {
        private readonly IUserService _userService;
        private readonly ApplicationDbContext _context;
        public BeersController(
            IUserService userService,
            ApplicationDbContext context
            )
        {
            _userService = userService;
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetBeers()
        {
            User? user = await this._userService.GetCurrentUser();
            if (user == null)
            {
                return NotFound();
            }
            List<Drink> drinks = await _context.Drinks.Where(d => d.User == user).ToListAsync();
            return Ok(drinks);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBeer(string id)
        {
            Drink drink = await _context.Drinks.FindAsync(id);
            if(drink == null)
            {
                return NotFound();
            }
            return Ok(drink);
        }

        [HttpPost]
        public async Task<IActionResult> Post(DrinkModel drinkModel)
        {
            Drink drink = new Drink();
            drink.Id = Guid.NewGuid().ToString();
            drink.Mark = drinkModel.Mark;
            drink.User = await this._userService.GetCurrentUser();
            drink.Description = drinkModel.Description;
            drink.Name = drinkModel.Name;

            try
            {
                _context.Drinks.Add(drink);
                await _context.SaveChangesAsync();
            } catch (Exception ex)
            {
                return Problem(ex.Message);
            }
            return Ok(drink);
        }
    }
}

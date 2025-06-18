using Microsoft.AspNetCore.Mvc;
using db_back.Models;
using Microsoft.EntityFrameworkCore;
using db_back.Dtos;


namespace db_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly WebContext _context;
        public UserController(WebContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)// Endpoint to register a new user
        {
            if (user == null || string.IsNullOrEmpty(user.name) || string.IsNullOrEmpty(user.email) || string.IsNullOrEmpty(user.password))// Validate user data
            {
                return BadRequest("Invalid user data.");
            }
            user.logDate = DateTime.Now; // Set logDate to current time
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            if (login == null || string.IsNullOrEmpty(login.email) || string.IsNullOrEmpty(login.password))
            {
                return BadRequest("Invalid login data.");
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u =>
                u.email == login.email && u.password == login.password);

            if (existingUser == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            existingUser.logDate = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok("Login successful.");
        }
    }
}

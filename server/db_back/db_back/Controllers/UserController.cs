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
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null || string.IsNullOrEmpty(user.name) || string.IsNullOrEmpty(user.email) || string.IsNullOrEmpty(user.password))
            {
                return BadRequest(new { message = "Invalid user data." });
            }

            user.logDate = DateTime.UtcNow;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            if (login == null || string.IsNullOrEmpty(login.email) || string.IsNullOrEmpty(login.password))
            {
                return BadRequest(new { message = "Invalid login data." });
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u =>
                u.email == login.email && u.password == login.password);

            if (existingUser == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            existingUser.logDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Login successful",
                user = new
                {
                    id = existingUser.id,
                    name = existingUser.name,
                    email = existingUser.email,
                    logDate = existingUser.logDate
                }
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using url_shorter_backend.models;
using url_shorter_backend.models.users;

namespace url_shorter_backend.controllers;

[ApiController]
[Route("api/auth/")]
public class AuthController : ControllerBase
{

    private readonly services.JwtTokenService _jwtTokenService;
    private readonly AppDbContext _dbContext;

    public AuthController(services.JwtTokenService jwtTokenService, AppDbContext dbContext)
    {
        _jwtTokenService = jwtTokenService;
        _dbContext = dbContext;
    }

    [HttpPost("validate")]
    [Authorize]
    public async Task<IActionResult> ValidateToken()
    {
        // Заглушка: в реальном API надо проверять подпись JWT и его данные
        bool isValid = true;

        var id = int.Parse(User.FindFirst("Id")?.Value);
        var username = User.FindFirst("Username")?.Value;

        var existingUser = await _dbContext.Users.FirstOrDefaultAsync(
            u =>
                u.Id == id &&
                u.Username == username
        );

        if (existingUser == null)
        {
            return Unauthorized("Invalid credentials");
        }

        return Ok(new
        {
            existingUser.Id,
            existingUser.Username,
            valid = isValid,
        });
    }

    [HttpPost("signin")]
    public async Task<IActionResult> Signin([FromBody] User user)
    {
        var existingUser = await _dbContext.Users.FirstOrDefaultAsync(
            u =>
                u.Username == user.Username &&
                u.Password == user.Password
        );

        if (existingUser == null)
        {
            return Unauthorized("Invalid credentials");
        }

        var token = _jwtTokenService.GenerateToken(existingUser.Id, existingUser.Username);
        return Ok(new
        {
            existingUser.Id,
            existingUser.Username,
            Token = token
        });
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] User user)
    {
        var existingUser = await _dbContext.Users.FirstOrDefaultAsync(
            u =>
                u.Username == user.Username
        );

        if (existingUser != null)
        {
            return Conflict(new { message = "User already is exist" });
        }

        _dbContext.Users.Add(new UserDB()
        {
            Username = user.Username,
            Password = user.Password,
        });
        _dbContext.SaveChanges();

        existingUser = await _dbContext.Users.FirstOrDefaultAsync(
            u =>
                u.Username == user.Username &&
                u.Password == user.Password
        );

        // TODO: заглушка
        var token = _jwtTokenService.GenerateToken(existingUser.Id, existingUser.Username);
        return Ok(new
        {
            existingUser.Id,
            existingUser.Username,
            Token = token
        });
    }

}

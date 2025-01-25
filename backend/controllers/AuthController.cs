using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace url_shorter_backend.controllers;

[ApiController]
[Route("api/auth/")]
public class AuthController : ControllerBase
{

    private readonly services.JwtTokenService _jwtTokenService;

    public AuthController(services.JwtTokenService jwtTokenService)
    {
        _jwtTokenService = jwtTokenService;
    }

    [HttpPost("validate")]
    [Authorize]
    public IActionResult ValidateToken()
    {
        // Заглушка: в реальном API надо проверять подпись JWT и его данные
        bool isValid = true;

        return Ok(new { valid = isValid });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserData user)
    {
        // TODO: заглушка
        if (user.Username == "admin" && user.Password == "password")
        {
            var token = _jwtTokenService.GenerateToken("1");
            return Ok(new { Token = token });
        }

        return Unauthorized("Invalid credentials");
    }

    [HttpPost("signup")]
    public IActionResult Signup([FromBody] UserData user)
    {
        // TODO: заглушка
        var token = _jwtTokenService.GenerateToken("1");
        return Ok(new { Token = token });
    }

}

public class UserData
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}

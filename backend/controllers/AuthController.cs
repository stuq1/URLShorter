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

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        // TODO: заглушка
        if (request.Username == "admin" && request.Password == "password")
        {
            var token = _jwtTokenService.GenerateToken("1");
            return Ok(new { Token = token });
        }

        return Unauthorized("Invalid credentials");
    }

}

public class LoginRequest
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}

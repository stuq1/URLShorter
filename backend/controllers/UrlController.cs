using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace url_shorter_backend.controllers;

[ApiController]
[Route("api/url/")]
public class UrlController : ControllerBase
{

    [HttpGet("list")]
    [Authorize]
    [AllowAnonymous]
    public IActionResult List()
    {
        // Возвращаем авторизованному пользователю созданные им ссылки
        if (!User.Identity.IsAuthenticated)
        {
            return Ok(new {
                data = new object[] { }
            });
        }

        // TODO: заглушка
        return Ok(new[] {
            new {
                id = 1,
                full_url = "https://...",
                short_url = "https://...",
                creation_date = "25/01/2025",
                clicks_count = 10,
            },
            new {
                id = 2,
                full_url = "https://...",
                short_url = "https://...",
                creation_date = "25/01/2025",
                clicks_count = 10,
            },
            new {
                id = 3,
                full_url = "https://...",
                short_url = "https://...",
                creation_date = "25/01/2025",
                clicks_count = 10,
            }
        });
    }

}

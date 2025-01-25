using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace url_shorter_backend.controllers;

[ApiController]
[Route("api/url/")]
public class UrlController
{

    [HttpGet("list")]
    [Authorize]
    public IResult List()
    {
        // TODO: заглушка
        return Results.Json(new[] {
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

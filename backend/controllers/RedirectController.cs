using Microsoft.AspNetCore.Mvc;
using System.Text;
using url_shorter_backend.models;

namespace url_shorter_backend.controllers;

[ApiController]
[Route("/")]
public class RedirectController : ControllerBase
{

    private readonly AppDbContext _dbContext;

    public RedirectController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("{shortUrl}")]
    public async Task<IActionResult> url(string shortUrl)
    {
        var url = _dbContext.Urls.FirstOrDefault(
            e => e.UrlShort == shortUrl
        );

        if (url is null)
        {
            return NotFound();
        }

        url.ClicksCount += 1;
        _dbContext.Urls.Update(url);
        _dbContext.SaveChanges();

        // Защита от использования сервиса злоумышленниками
        HttpContext.Response.Headers.Append("Refresh", $"5;{url.UrlFull}");
        return Content("" +
            "<html>" +
            "<head><title>URL Shorter</title></head>" +
            $"<body>Добро пожаловать на сайт URL Shorter<br>" +
            $"Через 5 секунд вы будете перенаправлены на сайт {url.UrlFull}</body>" +
            "</html>" +
            "", "text/html", Encoding.UTF8
        );
    }

}

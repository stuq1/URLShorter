using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using url_shorter_backend.models;
using url_shorter_backend.models.urls;
using url_shorter_backend.services;

namespace url_shorter_backend.controllers;

[ApiController]
[Route("api/url/")]
public class UrlController : ControllerBase
{

    private readonly AppDbContext _dbContext;
    private readonly ShortUrlGenerator _shortUrlGenerator;

    public UrlController(AppDbContext dbContext, ShortUrlGenerator shortUrlGenerator)
    {
        _dbContext = dbContext;
        _shortUrlGenerator = shortUrlGenerator;
    }

    [HttpGet("list")]
    [Authorize]
    [AllowAnonymous]
    public IActionResult List()
    {
        // Возвращаем авторизованному пользователю созданные им ссылки
        // А анонимный пользователь ничего не видет

        if (!User.Identity.IsAuthenticated)
        {
            return Ok(new
            {
                urls = new object[] { }
            });
        }

        int UserId = int.Parse(User.FindFirst("Id")!.Value);

        var urls = _dbContext.Urls.Where(
            u => u.UserId == UserId
        ).OrderByDescending( u => u.Id ).ToList();

        return Ok(new { urls });
    }

    [HttpPost("add")]
    [Authorize]
    [AllowAnonymous]
    public async Task<IActionResult> Add([FromBody] Url url)
    {
        // Ссылки можно добавлять как анонимно, так и под пользователем
        // Одну и ту же ссылку можно добавить как анонимно, так и из под пользователя. В таком случае эту будут разные ссылки
        // Обоснование - вдруг паре разных маркетолов потребуется в разных местах сделать ссылку на одну и ту же страницу с
        // одинаковыми UTM метками, но при этом потребуется сравнить откуда переходов будет больше

        if (url == null)
        {
            return BadRequest(new
            {
                error = "Данные не были переданы"
            });
        }

        if (string.IsNullOrWhiteSpace(url.UrlFull) || url.CreationDate == default)
        {
            return BadRequest(new
            {
                error = "Переданы не все данные"
            });
        }

        if (!Uri.TryCreate(url.UrlFull, UriKind.Absolute, out Uri? uri) || (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps))
        {
            return BadRequest(new
            {
                error = "Поддерживаются только \"http://\" и \"https://\" ссылки"
            });
        }

        var isUser = User.Identity.IsAuthenticated;
        var claimId = User.FindFirst("Id")?.Value;
        int? userId = (isUser && claimId is not null) ? int.Parse(claimId) : null;

        var existingUrl = await _dbContext.Urls.FirstOrDefaultAsync(
            u =>
                u.UserId == userId &&
                u.UrlFull == url.UrlFull
        );

        if (existingUrl == null)
        {
            string urlShort = await _shortUrlGenerator.GenerateUniqueShortCodeAsync(url.UrlFull, url.CreationDate, userId); // ShortUrlGenerator.GenerateShortUrl(url.UrlFull);

            existingUrl = await _dbContext.Urls.FirstOrDefaultAsync(
                u =>
                    u.UserId == userId &&
                    u.UrlFull == url.UrlFull
            );
        }

        return Ok(existingUrl);
    }

}

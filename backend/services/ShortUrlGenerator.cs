using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Security.Cryptography;
using System.Text;
using url_shorter_backend.models;

namespace url_shorter_backend.services;

public class ShortUrlGenerator
{
    private const string Base62Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private const int ShortCodeLength = 7;
    private const int MaxCollisionRetries = 10;

    private readonly AppDbContext _context;

    public ShortUrlGenerator(AppDbContext context)
    {
        _context = context;
    }

    public async Task<string> GenerateUniqueShortCodeAsync(string urlFull, DateTime creationDate, int? userId)
    {
        string urlShort;
        int attempt = 0;
        string salt = string.Empty;

        do
        {
            urlShort = GenerateShortCode(urlFull, salt);

            var exists = await _context.Urls
                .AsNoTracking()
                .AnyAsync(u => u.UrlShort == urlShort);

            if (!exists)
            {
                break;
            }

            salt += Guid.NewGuid().ToString("N");
            attempt++;

        } while (attempt < MaxCollisionRetries);

        if (attempt >= MaxCollisionRetries)
        {
            urlShort = GenerateUuidFallbackCode();
        }

        await using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var url = new models.urls.UrlDB
            {
                UrlFull = urlFull,
                UrlShort = urlShort,
                CreationDate = creationDate,
                ClicksCount = 0,
                UserId = userId
            };

            _context.Urls.Add(url);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch (DbUpdateException ex) when (IsUniqueConstraintViolation(ex))
        {
            await transaction.RollbackAsync();
            return await GenerateUniqueShortCodeAsync(urlFull, creationDate, userId);
        }

        return urlShort;
    }

    private static string GenerateShortCode(string url, string salt)
    {
        using var sha256 = SHA256.Create();
        var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(url + salt));
        var numericHash = BitConverter.ToUInt64(hashBytes);
        return EncodeBase62(numericHash)[..ShortCodeLength];
    }

    private static string GenerateUuidFallbackCode()
    {
        var guidBytes = Guid.NewGuid().ToByteArray();
        var numericGuid = BitConverter.ToUInt64(guidBytes);
        return EncodeBase62(numericGuid)[..ShortCodeLength];
    }

    private static string EncodeBase62(ulong number)
    {
        var buffer = new Stack<char>(12);

        do
        {
            buffer.Push(Base62Chars[(int)(number % 62)]);
            number /= 62;
        } while (number > 0);

        return new string(buffer.ToArray());
    }

    private static bool IsUniqueConstraintViolation(DbUpdateException ex)
    {
        return ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505";
    }

}

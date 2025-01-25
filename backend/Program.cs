using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace url_shorter_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddRouting();
            builder.Services.AddControllers();

            var configuration = builder.Configuration;

            builder.Services.AddAuthorization();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var jwtSettings = configuration.GetSection("JwtSettings");
                    var secretKey = jwtSettings?["SecretKey"];
                    var issuer = jwtSettings?["Issuer"];
                    var audience = jwtSettings?["Audience"];
                    var expirationInMinutes = jwtSettings?["ExpirationInMinutes"];

                    if (jwtSettings is null ||
                        secretKey is null ||
                        issuer is null ||
                        audience is null ||
                        expirationInMinutes is null)
                    {
                        throw new Exception("JWT settings are not defined!");
                    }

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = issuer,
                        ValidAudience = audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                    };
                });
            builder.Services.AddSingleton<services.JwtTokenService>();

            var app = builder.Build();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapControllers();
            });

            app.MapGet("/", () => "Index");

            app.Run();
        }
    }
}

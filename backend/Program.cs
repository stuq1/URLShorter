using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "URL Shorter API",
                    Version = "v1"
                });

                // ��������� ����������� �������������� JWT �������
                c.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Description = "Authorization header using the Bearer scheme (Authorization: Bearer &lt;token&gt;). <br> Do not specify the prefix 'Bearer'",
                    BearerFormat = "JWT",
                    Scheme = "bearer",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme {
                            Reference = new OpenApiReference
                            {
                                Id = "bearer",
                                Type = ReferenceType.SecurityScheme
                            }
                        },
                        new string[] { "" }
                    }
                });
            });

            var app = builder.Build();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapControllers();
            });

            app.MapGet("/", () => "Index");
            //app.MapGet("/data", [Authorize] (HttpContext context) => $"Hello World!");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.Run();
        }
    }
}

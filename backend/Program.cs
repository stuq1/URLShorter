using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using url_shorter_backend.models;

namespace url_shorter_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var MyAllowSpecificOrigins = "URLShorterSpecificOrigins";

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

            var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
            builder.Services.AddDbContextPool<AppDbContext>(options => options.UseNpgsql(/*builder.Configuration.GetConnectionString("PostgresConnection")*/connectionString));


            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "URL Shorter API",
                    Version = "v1"
                });

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

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                    policy =>
                    {
                        policy.WithOrigins(configuration["CorsOrigin"]!)
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    }
                );
            });

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                try
                {
                    dbContext.Database.OpenConnection();
                    dbContext.Database.CloseConnection();
                    Console.WriteLine("Database is work");
                }
                catch
                {
                    Console.WriteLine("Database connection error");
                }
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapControllers();
            });

            app.MapGet("/", () => "Index");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.Run();
        }
    }
}

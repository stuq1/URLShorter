using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace url_shorter_backend.models.urls;

[Table("Urls")]
public class UrlDB : Url
{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required string UrlShort { get; set; }
    public required int ClicksCount { get; set; } = 0;

    public int? UserId { get; set; }

}

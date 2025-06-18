using System.ComponentModel.DataAnnotations;

namespace db_back.Dtos
{
    public class LoginDto
    {
        public string email { get; set; } // Email of the user
        public string password { get; set; } // Password of the user
    }
}

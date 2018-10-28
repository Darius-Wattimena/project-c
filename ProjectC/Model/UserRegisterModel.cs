using ProjectC.Database.Entities;

namespace ProjectC.Model
{
    public class UserRegisterModel : User
    {
        public string Password;
        public string ConfirmPassword;
    }
}

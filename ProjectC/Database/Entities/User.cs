using DevOne.Security.Cryptography.BCrypt;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;
using ProjectC.Model;

namespace ProjectC.Database.Entities
{
    [Entity("User")]
    public class User : IEntity
    {
        public User()
        {

        }

        public User(UserRegisterModel model)
        {
            var salt = BCryptHelper.GenerateSalt();
            var hashedPassword = BCryptHelper.HashPassword(model.Password, salt);
            Username = model.Username;
            PasswordSalt = salt;
            PasswordHash = hashedPassword;
            Firstname = model.Firstname;
            Lastname = model.Lastname;
        }

        [Field("UserId", Core.Type.Integer, Primary = true)]
        public int Id;

        [Field(Core.Type.Varchar, Size = 45)]
        public string Username;

        [Field(Core.Type.Varchar, Size = 100)]
        public string Firstname;

        [Field(Core.Type.Varchar, Size = 100)]
        public string Lastname;

        [Field(Core.Type.Varchar)]
        public string MailAddress;

        [Field(Core.Type.Varchar, Size = 61)]
        public string PasswordHash;

        [Field(Core.Type.Varchar, Size = 29)]
        public string PasswordSalt;

        public int GetId()
        {
            return Id;
        }

        public void SetId(int id)
        {
            this.Id = id;
        }
    }
}
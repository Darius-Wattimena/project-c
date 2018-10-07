using DevOne.Security.Cryptography.BCrypt;
using ProjectC.Database.Core;
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
            PasswordHash = hashedPassword;
            Firstname = model.Firstname;
            Lastname = model.Lastname;
            MailAddress = model.MailAddress;
        }

        [Field("UserId", FieldType.Integer, Primary = true)]
        public int Id;

        [Field(FieldType.Varchar, Size = 100)]
        public string Firstname;

        [Field(FieldType.Varchar, Size = 100)]
        public string Lastname;

        [Field(FieldType.Varchar)]
        public string MailAddress;

        [Field(FieldType.Varchar, Size = 61)]
        public string PasswordHash;

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
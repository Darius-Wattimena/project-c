using DevOne.Security.Cryptography.BCrypt;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;
using ProjectC.Model;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class User : IEntity
    {
        public User()
        {

        }

        public User SetupUser(UserRegisterModel model)
        {
            SetId(0);
            var salt = BCryptHelper.GenerateSalt();
            var hashedPassword = BCryptHelper.HashPassword(model.Password, salt);
            PasswordHash = hashedPassword;
            return this;
        }

        [Field("UserId", Primary = true)]
        public int Id;

        [Field] public string Firstname;
        [Field] public string Lastname;
        [Field] public string MailAddress;
        [Field] public string PasswordHash;
        [Field] public int AddressId;
        [Field] public int ShippingAddressId;
        [Field] public int RoleId;
        [Field] public int ActiveYn;

        public Address Address;

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